/**
 * Parse the attendees input field into a number.
 * Negative counts are not meaningful group sizes, so they clamp to 0 (no filter).
 */
export function parseAttendees(value: string): number {
  return Math.max(0, Number(value) || 0);
}
