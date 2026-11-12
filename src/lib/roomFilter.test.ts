import { describe, it, expect } from "vitest";
import { rooms, bookings } from "@/data/rooms";
import { filterRooms } from "@/lib/roomFilter";

const ids = (matches: { room: { id: string } }[]) => matches.map((m) => m.room.id);

describe("filterRooms", () => {
  // F1: capacity must be >= attendees
  it("includes a room whose capacity equals the attendee count / вместимость равна числу гостей", () => {
    expect(ids(filterRooms(rooms, { attendees: 40, equipment: [] }))).toEqual(["r1", "r2"]);
  });

  it("excludes rooms smaller than the attendee count / комнаты меньше нужной вместимости исключены", () => {
    expect(ids(filterRooms(rooms, { attendees: 41, equipment: [] }))).toEqual(["r1"]);
  });

  // F2: room must have ALL selected equipment
  it("matches one selected equipment item / одна выбранная позиция", () => {
    expect(ids(filterRooms(rooms, { attendees: 1, equipment: ["Projector"] }))).toEqual(["r1", "r2", "r5"]);
  });

  it("requires all selected equipment items / нужны все выбранные позиции", () => {
    expect(ids(filterRooms(rooms, { attendees: 1, equipment: ["Projector", "Whiteboard"] }))).toEqual(["r1"]);
  });

  it("returns capacity matches when no equipment is selected / без оборудования фильтр только по вместимости", () => {
    expect(ids(filterRooms(rooms, { attendees: 30, equipment: [] }))).toEqual(["r1", "r2", "r3"]);
  });

  // F4 support: no room matches -> empty list
  it("returns an empty list when no room matches / ни одна комната не подходит", () => {
    expect(filterRooms(rooms, { attendees: 200, equipment: [] })).toEqual([]);
  });

  // F3: a blocked room is never reported as available
  it("reports a blocked matching room as not available / заблокированная комната не доступна", () => {
    const matches = filterRooms(rooms, { attendees: 1, equipment: ["Whiteboard"] });
    const blocked = matches.find((m) => m.room.id === "r4");
    expect(blocked).toBeDefined();
    expect(blocked?.available).toBe(false);
  });

  it("marks open matching rooms as available / открытые подходящие комнаты доступны", () => {
    const matches = filterRooms(rooms, { attendees: 1, equipment: ["Whiteboard"] });
    expect(matches.find((m) => m.room.id === "r1")?.available).toBe(true);
  });

  // AC5: filtering must not change the room or booking data
  it("does not modify rooms or bookings / не меняет комнаты и бронирования", () => {
    const roomsBefore = JSON.stringify(rooms);
    const bookingsBefore = JSON.stringify(bookings);
    filterRooms(rooms, { attendees: 1, equipment: ["Whiteboard"] });
    expect(JSON.stringify(rooms)).toBe(roomsBefore);
    expect(JSON.stringify(bookings)).toBe(bookingsBefore);
  });
});
