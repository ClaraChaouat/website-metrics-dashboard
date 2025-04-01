import dayjs from "dayjs";
import { ChartData } from "chart.js";
import { Metric } from "../types/metrics";

export const getMetricLineChart = (
  metrics: Metric[],
  metric: "clicks" | "impressions" | "conversions" | "cost"
): ChartData<"line"> => ({
  labels: metrics.map((m) => dayjs(m.timestamp).format("MMM D")),
  datasets: [
    {
      label: metric.charAt(0).toUpperCase() + metric.slice(1),
      data: metrics.map((m) => m[metric]),
      borderColor: "rgb(59,130,246)",
      backgroundColor: "rgba(59,130,246,0.5)",
    },
  ],
});
