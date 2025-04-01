import dayjs from "dayjs";
import { ChartData } from "chart.js";
import { Metric } from "../types/metrics";
import { chartColors } from "../styles/theme";

export const getClickChartData = (metrics: Metric[]): ChartData<"line"> => ({
  labels: metrics.map((m) => dayjs(m.timestamp).format("MMM D")),
  datasets: [
    {
      label: "Clicks",
      data: metrics.map((m) => m.clicks),
      borderColor: chartColors.primary.border,
      backgroundColor: chartColors.primary.background,
    },
  ],
});
