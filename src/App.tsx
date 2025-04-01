import { useMemo, useState } from "react";
import KeyMetrics from "./components/KeyMetrics";
import PeriodLabel from "./components/PeriodLabel";
import ChartsSection from "./components/ChartsSection";
import DatePicker from "./components/Datepicker";
import { getClickChartData } from "./helpers/chartData";
import { getConversionRateChartData } from "./helpers/conversionChart";
import { getMetricLineChart } from "./helpers/metricChartData";
import { useMetrics } from "./hooks/useMetrics";
import { Range } from "react-date-range";
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
    adjustedEnd.setHours(23, 59, 59, 999);

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
          <h1 className="text-4xl font-bold leading-tight mb-6 text-center" >
            Website Metrics Dashboard
          </h1>
          <div className="relative mb-8">
            <p className="ttext-sm font-bold text-gray-700 mb-2">
              Select a date range to view metrics:
            </p>
            <DatePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
              showPicker={showPicker}
              setShowPicker={setShowPicker}
              formattedRange={formattedRange}
            />
          </div>
          <PeriodLabel label={periodLabel} />
          <KeyMetrics
            total={total}
            hoveredMetric={hoveredMetric}
            setHoveredMetric={setHoveredMetric}
          />
          <ChartsSection
            hoveredMetric={hoveredMetric}
            dailyData={dailyData}
            conversionRateData={conversionRateData}
            impressionsChartData={impressionsChartData}
            costChartData={costChartData}
          />
        </div>
      </main>
    </>
  );
}

export default App;
