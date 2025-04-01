import { useState } from "react";
import KeyMetrics from "./components/KeyMetrics";
import PeriodLabel from "./components/PeriodLabel";
import ChartsSection from "./components/ChartsSection";
import DashboardLayout from "./components/Layout/DashboardLayout";
import DatePicker from "./components/Datepicker";
import { useQueryMetrics } from "./hooks/useMetrics";
import { useDateRange } from "./hooks/useDateRange";
import { useFilteredMetrics } from "./hooks/useFilteredMetrics";
import { useChartData } from "./hooks/useChartData";
import { Metric } from "./types/metrics";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
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
  const { data: metrics = [], isLoading, isError, error } = useQueryMetrics();

  const {
    dateRange,
    setDateRange,
    showPicker,
    setShowPicker,
    formattedRange,
    periodLabel,
  } = useDateRange();

  const [hoveredMetric, setHoveredMetric] = useState<
    "clicks" | "impressions" | "conversions" | "cost" | null
  >(null);

  const filteredMetrics: Metric[] = useFilteredMetrics(metrics, dateRange);

  const total = filteredMetrics.reduce(
    (acc, curr) => {
      acc.clicks += curr.clicks;
      acc.impressions += curr.impressions;
      acc.conversions += curr.conversions;
      acc.cost += curr.cost;
      return acc;
    },
    { clicks: 0, impressions: 0, conversions: 0, cost: 0 }
  );

  const {
    dailyData,
    conversionRateData,
    impressionsChartData,
    costChartData,
  } = useChartData(filteredMetrics);


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
    <DashboardLayout title="Website Metrics Dashboard">
      <div className="relative mb-8">
        <p className="text-sm font-bold text-gray-700 mb-2">
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

      {filteredMetrics.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No metrics available for the selected date range.
        </p>
      ) : (
        <>
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
        </>
      )}
    </DashboardLayout>
  );
}

export default App;
