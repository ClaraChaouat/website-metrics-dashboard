interface Props {
    label: string;
}

export default function PeriodLabel({ label }: Props) {
    if (!label) return null;

    return (
        <p className="text-sm text-gray-600 mb-6 text-center font-medium">
            Showing totals for:{" "}
            <span className="font-semibold text-gray-800">{label}</span>
        </p>
    );
}
