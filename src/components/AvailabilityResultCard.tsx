import { CheckCircle2, XCircle } from "lucide-react";
import type { AvailabilityResult } from "@/lib/availability";

interface AvailabilityResultCardProps {
  result: AvailabilityResult;
}

export default function AvailabilityResultCard({ result }: AvailabilityResultCardProps) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden border shadow-lg shadow-slate-200/50 ${
        result.status === "available"
          ? "bg-gradient-to-br from-emerald-50 via-emerald-50/70 to-white border-emerald-200"
          : "bg-gradient-to-br from-rose-50 via-rose-50/70 to-white border-rose-200"
      }`}
    >
      <div
        className={`h-1.5 w-full ${
          result.status === "available"
            ? "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400"
            : "bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400"
        }`}
      />
      <div className="flex items-start gap-5 p-5 sm:p-6">
        <div className="relative shrink-0">
          <div
            className={`flex items-center justify-center w-16 h-16 rounded-full ring-4 ${
              result.status === "available"
                ? "bg-emerald-500 ring-emerald-100"
                : "bg-rose-500 ring-rose-100"
            }`}
          >
            {result.status === "available" ? (
              <CheckCircle2 size={34} className="text-white" strokeWidth={2.5} />
            ) : (
              <XCircle size={34} className="text-white" strokeWidth={2.5} />
            )}
          </div>
        </div>
        <div className="min-w-0 flex-1 pt-1">
          <h3
            className={`font-extrabold text-2xl sm:text-3xl leading-tight tracking-tight ${
              result.status === "available" ? "text-emerald-900" : "text-rose-900"
            }`}
          >
            {result.status === "available" ? "Available" : result.status === "invalid" ? "Invalid time" : "Unavailable"}
          </h3>
          <p
            className={`text-sm font-medium mt-0.5 ${
              result.status === "available" ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {result.status === "available" ? "Room available" : result.status === "invalid" ? "Check the times" : "Room unavailable"}
          </p>
          <div
            className={`mt-3 pt-3 border-t ${
              result.status === "available" ? "border-emerald-200/60" : "border-rose-200/60"
            }`}
          >
            <p
              className={`text-sm leading-relaxed ${
                result.status === "available" ? "text-emerald-800/90" : "text-rose-800/90"
              }`}
            >
              {result.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
