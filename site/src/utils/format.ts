export function formatFecha(date: Date): string {
  return date.toLocaleDateString("en-US"   , {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
