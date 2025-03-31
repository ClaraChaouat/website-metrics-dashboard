import { fetchMetrics } from "./metricsService";

describe("metricsService", () => {
  const mockMetricsData = {
    title: "Website Metrics",
    data: [
      {
        timestamp: "2019-06-24 16:28:23",
        impressions: 33766,
        clicks: 179,
        cost: 25.68,
        conversions: 41,
      },
    ],
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch and return metrics data successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockMetricsData,
    });

    const result = await fetchMetrics();

    expect(global.fetch).toHaveBeenCalledWith("/metrics.json");
    expect(result).toEqual(mockMetricsData.data);
  });

  it("should throw error when fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    });

    await expect(fetchMetrics()).rejects.toThrow(
      "Metrics fetch failed: Failed to fetch metrics: Not Found"
    );
  });

  it("should throw error when data format is invalid", async () => {
    const invalidData = {
      title: "Website Metrics",
      data: [
        {
          timestamp: "2019-06-24 16:28:23",
          impressions: "invalid", 
          clicks: 179,
          cost: 25.68,
          conversions: 41,
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidData,
    });

    await expect(fetchMetrics()).rejects.toThrow(
      "Metrics fetch failed: Invalid metrics data format"
    );
  });

  it("should throw error when response is not an array", async () => {
    const invalidData = {
      title: "Website Metrics",
      data: "not an array",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidData,
    });

    await expect(fetchMetrics()).rejects.toThrow(
      "Metrics fetch failed: Invalid metrics data format"
    );
  });

  it("should handle network errors", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(fetchMetrics()).rejects.toThrow(
      "Metrics fetch failed: Network error"
    );
  });
});