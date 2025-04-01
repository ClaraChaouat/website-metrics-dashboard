import { useQuery } from "@tanstack/react-query";
import { fetchMetrics } from "../services/metricsService";



export const useQueryMetrics = () =>
  useQuery({
    queryKey: ["metrics"],
    queryFn: fetchMetrics,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
