import type { Room } from "@/data/rooms";

export interface RoomFilterCriteria {
  attendees: number;
  equipment: string[];
}

export interface RoomMatch {
  room: Room;
  available: boolean;
}

export function filterRooms(rooms: Room[], criteria: RoomFilterCriteria): RoomMatch[] {
  return rooms
    .filter(
      (room) =>
        room.capacity >= criteria.attendees &&
        criteria.equipment.every((item) => room.equipment.includes(item)),
    )
    .map((room) => ({ room, available: room.status === "open" }));
}
