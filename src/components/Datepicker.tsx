import { useEffect, useRef } from "react";
import { DateRange, Range } from "react-date-range";

interface DatePickerProps {
    dateRange: Range[];
    setDateRange: (range: Range[]) => void;
    showPicker: boolean;
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
    formattedRange: string;
}

export default function DatePicker({
    dateRange,
    setDateRange,
    showPicker,
    setShowPicker,
    formattedRange,
}: DatePickerProps) {
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setShowPicker(false);
            }
        }

        if (showPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPicker, setShowPicker]);

    return (
        <div className="relative mb-8" ref={pickerRef}>
            <button
                onClick={() => setShowPicker((prev) => !prev)}
                className="border border-gray-300 rounded px-4 py-2 text-sm bg-white shadow hover:shadow-md transition"
            >
                📅 {formattedRange}
            </button>

            {showPicker && (
                <div className="absolute z-10 mt-2">
                    <DateRange
                        editableDateInputs
                        onChange={(item) => {
                            setDateRange([item.selection]);
                            setShowPicker(false);
                        }}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                        maxDate={new Date()}
                        rangeColors={["#3B82F6"]}
                    />
                </div>
            )}
        </div>
    );
}
