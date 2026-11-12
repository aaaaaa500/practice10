import { useMemo, useState } from "react";
import { Clock, Search, RotateCcw, CalendarDays, Building2 } from "lucide-react";
import { rooms, CURRENT_TIME, type Room } from "@/data/rooms";
import { checkAvailability, type AvailabilityResult } from "@/lib/availability";
import { parseTimeToAnchor } from "@/lib/datetime";
import { filterRooms } from "@/lib/roomFilter";
import { parseAttendees } from "@/lib/parseAttendees";
import RoomTimeline from "@/components/RoomTimeline";
import RoomFilterPanel from "@/components/RoomFilterPanel";
import RoomList from "@/components/RoomList";
import TimeRangeInputs from "@/components/TimeRangeInputs";
import AvailabilityResultCard from "@/components/AvailabilityResultCard";
import ExistingBookings from "@/components/ExistingBookings";

export default function App() {
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [attendees, setAttendees] = useState<string>("");
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [checkedWindow, setCheckedWindow] = useState<{ start: string; end: string } | null>(null);

  const attendeeCount = parseAttendees(attendees);

  const allEquipment = useMemo(
    () => Array.from(new Set(rooms.flatMap((r) => r.equipment))).sort(),
    [],
  );

  const matches = useMemo(
    () => filterRooms(rooms, { attendees: attendeeCount, equipment: selectedEquipment }),
    [attendeeCount, selectedEquipment],
  );

  const selectedRoom = useMemo<Room | null>(
    () => matches.find((m) => m.room.id === selectedRoomId)?.room ?? null,
    [matches, selectedRoomId],
  );

  const result = useMemo<AvailabilityResult | null>(
    () => (checkedWindow ? checkAvailability(selectedRoom, checkedWindow.start, checkedWindow.end) : null),
    [checkedWindow, selectedRoom],
  );

  const candidate = useMemo(() => {
    if (!checkedWindow || !result || result.status === "invalid") return undefined;
    return {
      start: parseTimeToAnchor(checkedWindow.start),
      end: parseTimeToAnchor(checkedWindow.end),
      available: result.status === "available",
    };
  }, [checkedWindow, result]);

  const handleCheck = () => setCheckedWindow({ start: startTime, end: endTime });

  const handleStartTimeChange = (value: string) => {
    setStartTime(value);
    setCheckedWindow(null);
  };

  const handleEndTimeChange = (value: string) => {
    setEndTime(value);
    setCheckedWindow(null);
  };

  const toggleEquipment = (item: string) =>
    setSelectedEquipment((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );

  const handleReset = () => {
    setSelectedRoomId("");
    setStartTime("");
    setEndTime("");
    setAttendees("");
    setSelectedEquipment([]);
    setCheckedWindow(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/80 text-slate-900">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200/80 sticky top-0 z-20 shadow-sm shadow-slate-100/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Building2 size={22} />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold leading-tight tracking-tight">Smart Campus</h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-tight">Room Availability Checker</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Current time banner */}
        <div className="mb-5 flex items-center gap-2.5 text-sm text-slate-600 bg-white rounded-xl border border-slate-200/80 px-4 py-3 shadow-sm shadow-slate-100/40">
          <Clock size={16} className="text-slate-400 shrink-0" />
          <span>
            Current time:{" "}
            <strong className="text-slate-900 font-semibold">
              {CURRENT_TIME.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </strong>
            <span className="text-slate-400"> · {CURRENT_TIME.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</span>
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/30 overflow-hidden">
          {/* Room selection */}
          <section className="p-5 sm:p-6 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold shrink-0">1</span>
              <label className="text-sm font-semibold text-slate-800">
                Choose a room
              </label>
            </div>
            <RoomFilterPanel
              attendees={attendees}
              onAttendeesChange={setAttendees}
              allEquipment={allEquipment}
              selectedEquipment={selectedEquipment}
              onToggleEquipment={toggleEquipment}
            />
            <RoomList matches={matches} selectedRoomId={selectedRoomId} onSelectRoom={setSelectedRoomId} />
          </section>

          {/* Time selection */}
          <section className="p-5 sm:p-6 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold shrink-0">2</span>
              <label className="text-sm font-semibold text-slate-800">
                Pick a time
              </label>
            </div>
            <TimeRangeInputs
              startTime={startTime}
              endTime={endTime}
              onStartTimeChange={handleStartTimeChange}
              onEndTimeChange={handleEndTimeChange}
            />
          </section>

          {/* Action buttons */}
          <section className="p-5 sm:p-6 border-b border-slate-100">
            <div className="flex gap-3">
              <button
                onClick={handleCheck}
                disabled={!selectedRoom || !startTime || !endTime}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white text-sm font-semibold px-4 py-3 shadow-sm shadow-slate-300/50 hover:bg-slate-800 hover:shadow-md hover:shadow-slate-300/50 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-150"
              >
                <Search size={17} />
                Check Availability
              </button>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium px-4 py-3 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all duration-150"
              >
                <RotateCcw size={15} />
                Reset
              </button>
            </div>
          </section>

          {/* Result */}
          {result && (
            <section className="p-5 sm:p-6">
              <AvailabilityResultCard result={result} />
            </section>
          )}

          {/* Timeline for selected room */}
          {selectedRoom && (
            <section className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2 mb-3.5">
                <CalendarDays size={15} className="text-slate-400 shrink-0" />
                <p className="text-sm font-semibold text-slate-700">
                  {selectedRoom.name} — today's schedule
                </p>
              </div>
              <RoomTimeline roomId={selectedRoom.id} candidate={candidate} />
            </section>
          )}
        </div>

        {selectedRoom && <ExistingBookings roomId={selectedRoom.id} />}

        <footer className="mt-8 text-center text-xs text-slate-400">
          Fictional sample data for demonstration purposes only.
        </footer>
      </main>
    </div>
  );
}
