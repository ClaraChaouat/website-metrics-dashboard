import { useMemo, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import Card from "./components/Card";
import { getClickChartData } from "./helpers/chartData";
import { getConversionRateChartData } from "./helpers/conversionChart";
import { getMetricLineChart } from "./helpers/metricChartData";
import { useMetrics } from "./hooks/useMetrics";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function App() {
  const { data: metrics = [], isLoading, isError, error } = useMetrics();
  const [hoveredMetric, setHoveredMetric] = useState<
    "clicks" | "impressions" | "conversions" | "cost" | null
  >(null);

  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date("2019-06-24"),
      endDate: new Date("2019-07-24"),
      key: "selection",
    },
  ]);
  const [showPicker, setShowPicker] = useState(false);

  const filteredMetrics = useMemo(() => {
    const startDate = dateRange[0].startDate;
    const endDate = dateRange[0].endDate;

    if (!metrics || metrics.length === 0 || !startDate || !endDate) return [];

    const adjustedEnd = new Date(endDate);
    adjustedEnd.setHours(23, 59, 59, 999); // include full end day

    return metrics.filter((m) => {
      const timestamp = new Date(m.timestamp.replace(" ", "T"));
      return timestamp >= startDate && timestamp <= adjustedEnd;
    });
  }, [metrics, dateRange]);

  const total = useMemo(() => {
    if (!filteredMetrics.length) {
      return { clicks: 0, impressions: 0, conversions: 0, cost: 0 };
    }

    return filteredMetrics.reduce(
      (acc, curr) => {
        acc.clicks += curr.clicks;
        acc.impressions += curr.impressions;
        acc.conversions += curr.conversions;
        acc.cost += curr.cost;
        return acc;
      },
      { clicks: 0, impressions: 0, conversions: 0, cost: 0 }
    );
  }, [filteredMetrics]);

  const dailyData = getClickChartData(filteredMetrics);
  const conversionRateData = getConversionRateChartData(filteredMetrics);
  const impressionsChartData = getMetricLineChart(filteredMetrics, "impressions");
  const costChartData = getMetricLineChart(filteredMetrics, "cost");

  const periodLabel = useMemo(() => {
    const start = dateRange[0].startDate;
    const end = dateRange[0].endDate;
    if (!start || !end) return "";

    return `${dayjs(start).format("MMM D, YYYY")} – ${dayjs(end).format("MMM D, YYYY")}`;
  }, [dateRange]);

  const formattedRange = useMemo(() => {
    const start = dateRange[0].startDate;
    const end = dateRange[0].endDate;
    if (!start || !end) return "Select Date Range";

    return `${start.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })} – ${end.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  }, [dateRange]);

  if (isLoading) {
    return <div className="p-8 text-lg">Loading metrics...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">
        Failed to load metrics. Please try again. {error?.message}
      </div>
    );
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:p-4"
      >
        Skip to main content
      </a>

      <main
        className="min-h-screen bg-gray-100 p-6 font-sans"
        id="main-content"
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-32 max-w-none">
          <h1 className="text-3xl font-bold mb-6 text-center" tabIndex={0}>
            Website Metrics Dashboard
          </h1>

          {/* Date Picker */}
          <div className="relative mb-8">
            <button
              onClick={() => setShowPicker((prev) => !prev)}
              className="border border-gray-300 rounded px-4 py-2 text-sm bg-white shadow hover:shadow-md transition"
            >
              📅 {formattedRange}
            </button>

            {showPicker && (
              <div className="absolute z-10 mt-2">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    setDateRange([item.selection]);
                    setShowPicker(false);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  maxDate={new Date()}
                  rangeColors={["#3B82F6"]}
                />
              </div>
            )}
          </div>

          {/* Period Label */}
          {periodLabel && (
            <p className="text-sm text-gray-600 mb-6 text-center font-medium">
              Showing totals for:{" "}
              <span className="font-semibold text-gray-800">
                {periodLabel}
              </span>
            </p>
          )}

          {/* Key Metrics */}
          <section
            aria-label="Key Metrics Summary"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white rounded shadow p-6 mb-8 w-full"
          >

            <Card
              title="Total impressions"
              value={total.impressions.toLocaleString()}
              onHover={() => setHoveredMetric("impressions")}
              onLeave={() => setHoveredMetric(null)}
              ariaLabel={`Total Impressions: ${total.impressions.toLocaleString()}`}
            />
            <Card
              title="Total clicks"
              value={total.clicks.toLocaleString()}
              onHover={() => setHoveredMetric("clicks")}
              onLeave={() => setHoveredMetric(null)}
              ariaLabel={`Total clicks: ${total.clicks.toLocaleString()}`}
            />
            <Card
              title="Total conversions"
              value={total.conversions.toLocaleString()}
              onHover={() => setHoveredMetric("conversions")}
              onLeave={() => setHoveredMetric(null)}
              ariaLabel={`Total conversions: ${total.conversions.toLocaleString()}`}
            />
            <Card
              title="Total Cost ($)"
              value={total.cost.toFixed(2)}
              onHover={() => setHoveredMetric("cost")}
              onLeave={() => setHoveredMetric(null)}
              ariaLabel={`Total costs: ${total.cost.toLocaleString()}`}
            />
          </section>

          {/* Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8 w-full">
            <div
              className={`bg-white p-6 rounded shadow  h-full min-h-[300px] ${hoveredMetric === "clicks" ? "ring-4 ring-blue-300 scale-[1.01]" : ""
                }`}
            >
              <h2 className="text-xl font-semibold mb-4">Daily Clicks</h2>
              <Line data={dailyData} />
            </div>

            <div
              className={`bg-white p-6 rounded shadow  h-full min-h-[300px] ${hoveredMetric === "conversions" ? "ring-4 ring-blue-300 scale-[1.01]" : ""
                }`}
            >
              <h2 className="text-xl font-semibold mb-4">Daily Conversion Rate (%)</h2>
              <Bar data={conversionRateData} />
            </div>

            <div
              className={`bg-white p-6 rounded shadow  h-full min-h-[300px] ${hoveredMetric === "impressions" ? "ring-4 ring-blue-300 scale-[1.01]" : ""
                }`}
            >
              <h2 className="text-xl font-semibold mb-4">Daily Impressions</h2>
              <Line data={impressionsChartData} />
            </div>

            <div
              className={`bg-white p-6 rounded shadow  h-full min-h-[300px] ${hoveredMetric === "cost" ? "ring-4 ring-blue-300 scale-[1.01]" : ""
                }`}
            >
              <h2 className="text-xl font-semibold mb-4">Daily Cost ($)</h2>
              <Line data={costChartData} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
