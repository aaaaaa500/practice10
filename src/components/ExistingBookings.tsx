import { CalendarDays } from "lucide-react";
import { formatTime } from "@/lib/datetime";
import { getRoomBookings } from "@/lib/roomBookings";

interface ExistingBookingsProps {
  roomId: string;
}

export default function ExistingBookings({ roomId }: ExistingBookingsProps) {
  const roomBookings = getRoomBookings(roomId);

  return (
    <div className="mt-5">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
        <CalendarDays size={12} />
        Existing bookings
      </p>
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm shadow-slate-100/40 divide-y divide-slate-100 overflow-hidden">
        {roomBookings.length === 0 ? (
          <p className="px-4 py-4 text-sm text-slate-400 italic">No existing bookings for this room.</p>
        ) : (
          roomBookings.map((b) => (
            <div key={b.id} className="flex items-center justify-between px-4 py-3.5 text-sm hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                <span className="text-slate-700 truncate">{b.bookedBy}</span>
              </div>
              <span className="text-slate-500 tabular-nums font-medium shrink-0 ml-3">
                {formatTime(new Date(b.start))} – {formatTime(new Date(b.end))}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
