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
    return (
        <div className="relative mb-8">
            <button onClick={() => setShowPicker((prev: boolean) => !prev)}>
                📅 {formattedRange}
            </button>

            {showPicker && (
                <div className="absolute z-10 mt-2">
                    <DateRange
                        editableDateInputs={true}
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
