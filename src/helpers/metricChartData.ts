import dayjs from "dayjs";
import { ChartData } from "chart.js";
import { Metric } from "../types/metrics";
import { chartColors } from "../styles/theme";

export const getMetricLineChart = (
  metrics: Metric[],
  metric: "clicks" | "impressions" | "conversions" | "cost"
): ChartData<"line"> => ({
  labels: metrics.map((m) => dayjs(m.timestamp).format("MMM D")),
  datasets: [
    {
      label: metric.charAt(0).toUpperCase() + metric.slice(1),
      data: metrics.map((m) => m[metric]),
      borderColor: chartColors.primary.border,
      backgroundColor: chartColors.primary.background,
    },
  ],
});

