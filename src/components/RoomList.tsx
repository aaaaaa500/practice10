import { MapPin, Lock, Users, SearchX } from "lucide-react";
import type { RoomMatch } from "@/lib/roomFilter";

interface RoomListProps {
  matches: RoomMatch[];
  selectedRoomId: string;
  onSelectRoom: (roomId: string) => void;
}

export default function RoomList({ matches, selectedRoomId, onSelectRoom }: RoomListProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {matches.map(({ room, available }) => {
          const selected = room.id === selectedRoomId;
          const blocked = !available;
          return (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={`text-left rounded-xl border p-4 transition-all duration-150 ${
                selected
                  ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900/10 shadow-sm"
                  : blocked
                  ? "border-slate-200 bg-slate-50/30 hover:bg-slate-50/60"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 hover:shadow-sm"
              } ${blocked ? "opacity-65" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className={`font-semibold leading-tight ${selected ? "text-slate-900" : "text-slate-800"}`}>{room.name}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin size={12} className="shrink-0" />
                    <span className="truncate">{room.building}</span>
                  </div>
                </div>
                {blocked ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-full ring-1 ring-rose-100 shrink-0">
                    <Lock size={11} /> Blocked
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full ring-1 ring-emerald-100 shrink-0">
                    <Users size={11} /> {room.capacity}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {matches.length === 0 && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-500">
          <SearchX size={18} className="shrink-0 text-slate-400" />
          <p>No rooms match these filters. Try fewer attendees or fewer equipment items.</p>
        </div>
      )}
    </>
  );
}
