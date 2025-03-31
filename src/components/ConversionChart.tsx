import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface ConversionChartProps {
    data: ChartData<"bar">;

}

const ConversionChart = ({ data }: ConversionChartProps) => {
    return (
        <div className="bg-white p-6 rounded shadow mt-8">
            <h2 className="text-xl font-semibold mb-4">Daily Conversion Rate (%)</h2>
            <Bar data={data} />
        </div>
    );
};

export default ConversionChart;
