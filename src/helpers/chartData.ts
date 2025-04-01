import dayjs from "dayjs";
import { ChartData } from "chart.js";
import { Metric } from "../types/metric";



export const getClickChartData = (metrics: Metric[]): ChartData<"line"> => ({
  labels: metrics.map((m) => dayjs(m.timestamp).format("MMM D")),
  datasets: [
    {
      label: "Clicks",
      data: metrics.map((m) => m.clicks),
      borderColor: "rgb(59,130,246)",
      backgroundColor: "rgba(59,130,246,0.5)",
    },
  ],
});
