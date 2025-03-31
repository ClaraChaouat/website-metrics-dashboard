import dayjs from "dayjs";
import { ChartData } from "chart.js";
import { Metric } from "./chartData";

export const getConversionRateChartData = (metrics: Metric[]): ChartData<"bar"> => ({
  labels: metrics.map((m) => dayjs(m.timestamp).format("MMM D")),
  datasets: [
    {
      label: "Conversion Rate (%)",
      data: metrics.map((m) =>
        m.clicks > 0 ? parseFloat(((m.conversions / m.clicks) * 100).toFixed(2)) : 0
      ),
      backgroundColor: "rgba(34,197,94,0.6)",
      borderColor: "rgba(34,197,94,1)",
      borderWidth: 1,
    },
  ],
});
