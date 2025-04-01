export interface Metric {
  timestamp: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  date: string;
}



export type MetricType = "clicks" | "impressions" | "conversions" | "cost";