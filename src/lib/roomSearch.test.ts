import { describe, it, expect } from "vitest";
import { rooms } from "@/data/rooms";
import { filterRooms } from "@/lib/roomFilter";
import { getRoomBookings } from "@/lib/roomBookings";
import { checkAvailability } from "@/lib/availability";

describe("room search flow", () => {
  // F5 end-to-end: one filter, two rooms, same slot, different results
  it("gives different results for the same slot in two filtered rooms / разные результаты для одного слота в двух комнатах", () => {
    const matches = filterRooms(rooms, { attendees: 20, equipment: ["Projector"] });
    expect(matches.map((m) => m.room.id)).toEqual(["r1", "r2"]);

    const first = matches.find((m) => m.room.id === "r1")!.room;
    const second = matches.find((m) => m.room.id === "r2")!.room;

    expect(checkAvailability(first, "11:00", "12:00").status).toBe("available");

    const secondResult = checkAvailability(second, "11:00", "12:00");
    expect(secondResult.status).toBe("unavailable");
    expect(getRoomBookings(second.id).map((b) => b.bookedBy)).toContain("Robotics Lab");
    expect(secondResult.message).toContain("Robotics Lab");
  });
});
