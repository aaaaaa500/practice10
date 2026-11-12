import { describe, it, expect } from "vitest";
import { parseAttendees } from "@/lib/parseAttendees";

// C1 regression: a negative attendee count is not a meaningful group size,
// so it must be treated the same as "no filter" (0), never passed through.
// EXPECTED TO FAIL until parseAttendees clamps negatives to 0.
describe("parseAttendees", () => {
  it("never returns a negative number / отрицательное число гостей становится 0", () => {
    expect(parseAttendees("-5")).toBe(0);
  });
});
