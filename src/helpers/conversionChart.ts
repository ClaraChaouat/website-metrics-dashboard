import { Metric } from "../types/metrics";
import { ChartData } from "chart.js";

export const getConversionRateChartData = (metrics: Metric[]): ChartData<"line", (number | null)[], unknown> => {
  return {
    labels: metrics.map((m) => new Date(m.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: "Conversion Rate (%)",
        data: metrics.map((m) => (m.impressions ? (m.conversions / m.impressions) * 100 : null)),
        borderColor: "#10B981",
        backgroundColor: "#6EE7B7",
        fill: false,
      },
    ],
  };
};
