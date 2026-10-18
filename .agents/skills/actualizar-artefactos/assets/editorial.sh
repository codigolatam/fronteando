#!/usr/bin/env bash
# Escrituras sobre el índice del planeador editorial (docs/editorial/).
# Contrato D033: stdout solo datos parseables, stderr diagnósticos,
# exit 0 éxito, exit 2 entrada ausente o invocación inválida;
# una mutación ante formato no parseado falla sin escribir.
set -euo pipefail

# Convenciones: el instalador escribe los valores del proyecto en
# convenciones.sh; una clave ausente rige por el valor por defecto.
conv="$(dirname "$0")/convenciones.sh"
if [ -f "$conv" ]; then
  . "$conv" 2>/dev/null || { echo "editorial.sh: convenciones malformadas: $conv" >&2; exit 2; }
fi

uso() {
  cat >&2 <<'EOF'
uso: editorial.sh <índice> <operación> [argumentos]
operaciones:
  mover <estado> <texto>   mueve la línea «- » que contiene <texto> a la
                           sección «## <estado>» del índice; la sección
                           destino debe existir y el texto casar una sola
                           línea dentro de las secciones; idempotente si
                           la línea ya está en la sección destino
EOF
  exit 2
}

# Una línea en blanco entre bloques: colapsa blancos repetidos y fuerza
# el blanco antes y después de cada encabezado «## ».
normalizar() {
  awk '
    NR > 1 && /^## / && prev !~ /^[[:space:]]*$/ { print "" }
    prev ~ /^## / && !/^[[:space:]]*$/ && !/^## / { print "" }
    /^[[:space:]]*$/ && prev ~ /^[[:space:]]*$/ { next }
    { print; prev = $0 }
  ' "$1"
}

[ $# -ge 1 ] || uso
f=$1; shift
[ -f "$f" ] || { echo "editorial.sh: índice no encontrado: $f" >&2; exit 2; }
[ $# -ge 1 ] || uso
op=$1; shift
tmp=$(mktemp "${TMPDIR:-/tmp}/editorial.XXXXXX")
trap 'rm -f "$tmp"' EXIT

case "$op" in
  mover)
    [ $# -ge 2 ] || uso
    estado=$1; texto=$2
    [ -n "$texto" ] || uso
    if TEXTO="$texto" awk -v seccion="## $estado" '
      /^## / { dentro = 1 }
      dentro && index($0, "- ") == 1 && index($0, ENVIRON["TEXTO"]) > 0 { n++; nl = NR }
      { l[NR] = $0; if ($0 == seccion) s = NR }
      END {
        if (n != 1 || !s) exit 1
        fin = NR + 1
        for (i = s + 1; i <= NR && fin == NR + 1; i++) if (l[i] ~ /^## /) fin = i
        if (nl > s && nl < fin) {           # ya está en la sección destino
          for (i = 1; i <= NR; i++) print l[i]; exit 0
        }
        ins = fin
        while (ins - 1 > s && l[ins - 1] ~ /^[[:space:]]*$/) ins--
        if (ins == s + 1 && s < NR && l[s + 1] ~ /^[[:space:]]*$/) ins = s + 2
        for (i = 1; i <= NR; i++) {
          if (i == ins) { print l[nl]; if (l[i] ~ /^## /) print "" }
          if (i != nl) print l[i]
        }
        if (ins > NR) print l[nl]
      }
    ' "$f" > "$tmp"; then
      normalizar "$tmp" > "$tmp.n" && mv "$tmp.n" "$tmp"
      mv "$tmp" "$f"
    else
      echo "editorial.sh: línea no localizable o sección ausente en $f: «${texto}» → «${estado}»" >&2; exit 1
    fi
    ;;
  *)
    uso
    ;;
esac
