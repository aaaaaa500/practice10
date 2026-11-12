import { CircleDot } from "lucide-react";

interface TimeRangeInputsProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
}

export default function TimeRangeInputs({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: TimeRangeInputsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="start-time" className="text-xs font-medium text-slate-500 block mb-1.5">
            Start time
          </label>
          <input
            id="start-time"
            type="time"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm bg-slate-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900/15 focus:border-slate-400 focus:bg-white"
          />
        </div>
        <div>
          <label htmlFor="end-time" className="text-xs font-medium text-slate-500 block mb-1.5">
            End time
          </label>
          <input
            id="end-time"
            type="time"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm bg-slate-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900/15 focus:border-slate-400 focus:bg-white"
          />
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
        <CircleDot size={11} className="shrink-0" />
        Max booking length: 120 minutes. Start time must be after the current time.
      </p>
    </>
  );
}
