interface CardProps {
    title: string;
    value: string;
    onHover?: () => void;
    onLeave?: () => void;
    ariaLabel?: string;
}

const Card = ({ title, value, ariaLabel, onHover, onLeave }: CardProps) => {
    return (
        <article
            role="region"
            aria-label={ariaLabel || `${title}: ${value}`}
            onFocus={onHover}
            onBlur={onLeave}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className="bg-white p-8 rounded shadow text-center hover:shadow-lg transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
            <h2 className="text-gray-500 text-sm mb-1">{title}</h2>
            <p className="text-xl font-semibold">{value}</p>
        </article>
    );
};

export default Card;