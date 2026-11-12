interface RoomFilterPanelProps {
  attendees: string;
  onAttendeesChange: (value: string) => void;
  allEquipment: string[];
  selectedEquipment: string[];
  onToggleEquipment: (item: string) => void;
}

export default function RoomFilterPanel({
  attendees,
  onAttendeesChange,
  allEquipment,
  selectedEquipment,
  onToggleEquipment,
}: RoomFilterPanelProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
      <div>
        <label htmlFor="attendees" className="text-xs font-medium text-slate-500 block mb-1.5">
          Attendees
        </label>
        <input
          id="attendees"
          type="number"
          min={1}
          inputMode="numeric"
          placeholder="Any"
          value={attendees}
          onChange={(e) => onAttendeesChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm bg-slate-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900/15 focus:border-slate-400 focus:bg-white"
        />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 mb-1.5">Equipment needed</p>
        <div className="flex flex-wrap gap-2">
          {allEquipment.map((item) => {
            const checked = selectedEquipment.includes(item);
            return (
              <label
                key={item}
                className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                  checked
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleEquipment(item)}
                  className="sr-only"
                />
                {item}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
