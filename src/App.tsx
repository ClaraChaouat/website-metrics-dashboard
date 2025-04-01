import { useMemo, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import Card from "./components/Card";
import { getClickChartData } from "./helpers/chartData";
import { getConversionRateChartData } from "./helpers/conversionChart";
import { getMetricLineChart } from "./helpers/metricChartData";
import { useMetrics } from "./hooks/useMetrics";
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

ChartJS.register(LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);



function App() {

  const { data: metrics = [], isLoading, isError } = useMetrics();
  const [hoveredMetric, setHoveredMetric] = useState<"clicks" | "impressions" | "conversions" | "cost" | null>(null);

  const total = useMemo(() => {
    if (!metrics || metrics.length === 0) {
      return { clicks: 0, impressions: 0, conversions: 0, cost: 0 };
    }

    return metrics.reduce(
      (acc, curr) => {
        acc.clicks += curr.clicks;
        acc.impressions += curr.impressions;
        acc.conversions += curr.conversions;
        acc.cost += curr.cost;
        return acc;
      },
      { clicks: 0, impressions: 0, conversions: 0, cost: 0 }
    );
  }, [metrics]);

  if (isLoading) {
    return <div className="p-8 text-lg">Loading metrics...</div>;
  }

  if (isError) {
    return <div className="p-8 text-red-500">⚠️ Failed to load metrics. Please try again.</div>;
  }

  const chartData = getClickChartData(metrics);
  const conversionRateData = getConversionRateChartData(metrics);
  const impressionsChartData = getMetricLineChart(metrics, "impressions");
  const costChartData = getMetricLineChart(metrics, "cost");

  console.log("TOTAL:", total);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:p-4"
      >
        Skip to main content
      </a>
      <main className="w-screen min-h-screen bg-gray-100 p-8 font-sans overflow-x-hidden" id="main-content">
        <h1 className="text-3xl font-bold mb-4" tabIndex={0}>Website Metrics Dashboard </h1>

        <section aria-label="Key Metrics Summary" className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded shadow mb-8">
          <Card
            title="Impressions"
            value={total.impressions.toLocaleString()}
            onHover={() => setHoveredMetric("impressions")}
            onLeave={() => setHoveredMetric(null)}
            ariaLabel={`Total Impressions: ${total.impressions.toLocaleString()}`} />

          <Card
            title="Clicks"
            value={total.clicks.toLocaleString()}
            onHover={() => setHoveredMetric("clicks")}
            onLeave={() => setHoveredMetric(null)}
            ariaLabel={`Total clicks: ${total.clicks.toLocaleString()}`} />
          <Card
            title="Conversions"
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
            ariaLabel={`Total costs: ${total.cost.toLocaleString()}`} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`bg-white p-6 rounded shadow w-full max-h-[500px] ${hoveredMetric === "clicks" ? "ring-4 ring-blue-300 scale-[1.01]" : ""
            }`}>
            <h2 className="text-xl font-semibold mb-4">Daily Clicks</h2>
            <Line data={chartData} />
          </div>

          <div className={`bg-white p-6 rounded shadow w-full max-h-[500px] ${hoveredMetric === "conversions" ? "ring-4 ring-blue-300 scale-[1.01]" : ""
            }`}>
            <h2 className="text-xl font-semibold mb-4">Daily Conversion Rate (%)</h2>
            <Bar data={conversionRateData} />
          </div>

          <div className={`bg-white p-6 rounded shadow w-full max-h-[500px] ${hoveredMetric === "impressions" ? "ring-4 ring-blue-300 scale-[1.01]" : ""
            }`}>
            <h2 className="text-xl font-semibold mb-4">Daily Impressions</h2>
            <Line data={impressionsChartData} />
          </div>

          <div className={`bg-white p-6 rounded shadow w-full max-h-[500px] ${hoveredMetric === "cost" ? "ring-4 ring-blue-300 scale-[1.01]" : ""
            }`}>
            <h2 className="text-xl font-semibold mb-4">Daily Cost ($)</h2>
            <Line data={costChartData} />
          </div>
        </div>
      </main >
    </>
  );
}



export default App;
