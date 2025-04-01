
import { useState, useMemo } from "react";
import { Range } from "react-date-range";
import dayjs from "dayjs";

export function useDateRange(initialStart = "2019-06-24", initialEnd = "2019-07-24") {
    const [dateRange, setDateRange] = useState<Range[]>([
        { startDate: new Date(initialStart), endDate: new Date(initialEnd), key: "selection" },
    ]);
    const [showPicker, setShowPicker] = useState(false);

    const formattedRange = useMemo(() => {
        const start = dateRange[0].startDate;
        const end = dateRange[0].endDate;
        if (!start || !end) return "Select Date Range";
        return `${start.toLocaleDateString()} – ${end.toLocaleDateString()}`;
    }, [dateRange]);

    const periodLabel = useMemo(() => {
        const start = dateRange[0].startDate;
        const end = dateRange[0].endDate;
        if (!start || !end) return "";
        return `${dayjs(start).format("MMM D, YYYY")} – ${dayjs(end).format("MMM D, YYYY")}`;
    }, [dateRange]);

    return {
        dateRange,
        setDateRange,
        showPicker,
        setShowPicker,
        formattedRange,
        periodLabel,
    };
}
