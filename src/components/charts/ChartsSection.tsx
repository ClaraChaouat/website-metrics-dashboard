import { Line } from "react-chartjs-2";
import { ChartData, Point } from "chart.js";
import { MetricType } from "../../types/metrics";

export interface Props {
    hoveredMetric: "clicks" | "impressions" | "conversions" | "cost" | null;
    dailyData: ChartData<"line", (number | Point | null)[], unknown>;
    impressionsChartData: ChartData<"line", (number | Point | null)[], unknown>;
    costChartData: ChartData<"line", (number | Point | null)[], unknown>;
    conversionRateData: ChartData<"line", (number | Point | null)[], unknown>;
}

type ChartKey =
    | "dailyData"
    | "conversionRateData"
    | "impressionsChartData"
    | "costChartData";

const charts: {
    title: string;
    metric: MetricType;
    dataKey: ChartKey;
}[] = [
        { title: "Daily Clicks", metric: "clicks", dataKey: "dailyData" },
        {
            title: "Daily Conversion Rate (%)",
            metric: "conversions",
            dataKey: "conversionRateData",
        },
        {
            title: "Daily Impressions",
            metric: "impressions",
            dataKey: "impressionsChartData",
        },
        { title: "Daily Cost ($)", metric: "cost", dataKey: "costChartData" },
    ];

export default function ChartsSection({
    hoveredMetric,
    dailyData,
    conversionRateData,
    impressionsChartData,
    costChartData,
}: Props) {
    const chartMap: Record<
        ChartKey,
        ChartData<"line", (number | Point | null)[], unknown>
    > = {
        dailyData,
        conversionRateData,
        impressionsChartData,
        costChartData,
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8 w-full">
            {charts.map(({ title, metric, dataKey }) => (
                <div
                    key={title}
                    className={`bg-white p-6 rounded shadow min-h-[300px] ${hoveredMetric === metric ? "ring-4 ring-blue-300 scale-[1.01]" : ""
                        }`}>
                    <h2 className="text-xl font-semibold mb-4">{title}</h2>
                    <Line data={chartMap[dataKey]} />
                </div>
            ))}
        </div>
    );
}
