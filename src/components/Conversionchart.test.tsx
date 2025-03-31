import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ConversionChart from "./ConversionChart";
import { Metric } from "../hooks/useMetrics";
import { getConversionRateChartData } from "../helpers/conversionChart";


jest.mock("chart.js", () => ({
    Chart: { register: jest.fn() },
}));

jest.mock("react-chartjs-2", () => ({
    Bar: () => <div data-testid="mock-bar-chart">Bar Chart</div>,
}));

describe("ConversionChart", () => {
    const mockMetrics: Metric[] = [
        {
            timestamp: "2024-03-31",
            impressions: 1000,
            clicks: 100,
            conversions: 10,
            cost: 50.0,
        },
        {
            timestamp: "2024-03-30",
            impressions: 2000,
            clicks: 200,
            conversions: 20,
            cost: 100.0,
        },
    ];

    const chartData = getConversionRateChartData(mockMetrics);

    it("renders the chart component", () => {
        render(<ConversionChart data={chartData} />);
        expect(screen.getByTestId("mock-bar-chart")).toBeInTheDocument();
    });

    it("displays the chart title", () => {
        render(<ConversionChart data={chartData} />);
        expect(screen.getByText("Daily Conversion Rate (%)")).toBeInTheDocument();
    });

    it("handles empty metrics array", () => {
        const emptyData = getConversionRateChartData([]);
        render(<ConversionChart data={emptyData} />);
        expect(screen.getByTestId("mock-bar-chart")).toBeInTheDocument();
    });
});
