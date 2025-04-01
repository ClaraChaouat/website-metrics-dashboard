
import { useMemo } from "react";
import { Metric } from "../types/metrics";
import { Range } from "react-date-range";

export function useFilteredMetrics(metrics: Metric[], dateRange: Range[]) {
    return useMemo(() => {
        const startDate = dateRange[0].startDate;
        const endDate = dateRange[0].endDate;
        if (!startDate || !endDate) return [];

        const adjustedEnd = new Date(endDate);
        adjustedEnd.setHours(23, 59, 59, 999);

        return metrics.filter((m) => {
            const timestamp = new Date(m.timestamp.replace(" ", "T"));
            return timestamp >= startDate && timestamp <= adjustedEnd;
        });
    }, [metrics, dateRange]);
};
