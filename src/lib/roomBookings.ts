import { bookings } from "@/data/rooms";

export function getRoomBookings(roomId: string) {
  return bookings.filter((b) => b.roomId === roomId);
}
