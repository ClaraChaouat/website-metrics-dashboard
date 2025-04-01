import { Metric } from "../types/metrics";

interface MetricsResponse {
  title: string;
  data: Metric[];
}

const validateMetric = (metric: unknown): metric is Metric => {
  const m = metric as Metric;
  return (
    typeof m.timestamp === "string" &&
    typeof m.impressions === "number" &&
    typeof m.clicks === "number" &&
    typeof m.cost === "number" &&
    typeof m.conversions === "number"
  );
};

export const fetchMetrics = async (): Promise<Metric[]> => {
  try {
    const response = await fetch("/metrics.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch metrics: ${response.statusText}`);
    }

    const json = (await response.json()) as MetricsResponse;

    if (!Array.isArray(json.data) || !json.data.every(validateMetric)) {
      throw new Error("Invalid metrics data format");
    }

    return json.data;
  } catch (error) {
    throw new Error(
      `Metrics fetch failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
