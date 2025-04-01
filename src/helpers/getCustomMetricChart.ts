import { Metric } from "../types/metrics";
import { ChartData } from "chart.js";
import { chartColors } from "../styles/theme";

export const getCustomMetricChart = (
  metrics: Metric[]
): ChartData<"line", (number | null)[], unknown> => {
  return {
    labels: metrics.map((m) => new Date(m.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: "Conversion Rate (%)",
        data: metrics.map((m) =>
          m.impressions ? (m.conversions / m.impressions) * 100 : null
        ),
        borderColor: chartColors.success.border,
        backgroundColor: chartColors.success.background,
        fill: false,
      },
    ],
  };
};

