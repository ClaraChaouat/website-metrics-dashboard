import Card from "../ui/Card";

interface Props {
    total: {
        impressions: number;
        clicks: number;
        conversions: number;
        cost: number;
    };
    hoveredMetric: "clicks" | "impressions" | "conversions" | "cost" | null;
    setHoveredMetric: (metric: Props["hoveredMetric"]) => void;
}

export default function KeyMetrics({ total, hoveredMetric, setHoveredMetric }: Props) {
    const metrics = [
        { key: "impressions", label: "Total impressions", value: total.impressions.toLocaleString() },
        { key: "clicks", label: "Total clicks", value: total.clicks.toLocaleString() },
        { key: "conversions", label: "Total conversions", value: total.conversions.toLocaleString() },
        { key: "cost", label: "Total Cost ($)", value: total.cost.toFixed(2) },
    ];

    return (
        <section
            aria-label="Key Metrics Summary"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white rounded shadow p-6 mb-8 w-full"
        >
            {metrics.map((metric) => (
                <Card
                    key={metric.key}
                    title={metric.label}
                    value={metric.value}
                    onHover={() => setHoveredMetric(metric.key as Props["hoveredMetric"])}
                    onLeave={() => setHoveredMetric(null)}
                    ariaLabel={`${metric.label}: ${metric.value}`}
                    classname={hoveredMetric === metric.key ? "ring-2 ring-blue-300 scale-[1.01]" : ""}
                />
            ))}
        </section>
    );
}
