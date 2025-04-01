
import { Metric } from "../types/metrics";
import { getMetricLineChart } from "../helpers/metricChartData";
import { getCustomMetricChart } from "../helpers/getCustomMetricChart";

export function useChartData(filteredMetrics: Metric[]) {
    return {
        dailyData: getMetricLineChart(filteredMetrics, "clicks"),
        conversionRateData: getCustomMetricChart(filteredMetrics),
        impressionsChartData: getMetricLineChart(filteredMetrics, "impressions"),
        costChartData: getMetricLineChart(filteredMetrics, "cost"),
    };
}
