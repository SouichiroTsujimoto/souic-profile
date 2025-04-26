import { type SpringConfig, useTrail } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

interface SplitTextProps {
	text?: string;
	className?: string;
	delay?: number;
	animationFrom?: { opacity: number; transform: string };
	animationTo?: { opacity: number; transform: string };
	easing?: SpringConfig["easing"];
	threshold?: number;
	rootMargin?: string;
	textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
	onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
	text = "",
	className = "",
	delay = 100,
	easing = (t: number) => t,
	threshold = 0.1,
	rootMargin = "-100px",
	textAlign = "center",
}) => {
	const words = text.split(" ").map((word) => word.split(""));
	const letters = words.flat();
	const [inView, setInView] = useState(false);
	const ref = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					if (ref.current) {
						observer.unobserve(ref.current);
					}
				}
			},
			{ threshold, rootMargin },
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, [threshold, rootMargin]);

	// 単純なスタイルオブジェクトを使用
	const letterStyles = letters.map((_, i) => ({
		opacity: inView ? 1 : 0,
		transform: inView ? "translate3d(0,0,0)" : "translate3d(0,40px,0)",
		transition: "opacity 0.5s, transform 0.5s",
		transitionDelay: `${i * delay}ms`,
		display: "inline-block",
	}));

	return (
		<p
			ref={ref}
			className={`split-parent overflow-hidden inline ${className}`}
			style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
		>
			{words.map((word, wordIndex) => (
				<span
					key={`word-${wordIndex}-${word.join("")}`}
					style={{ display: "inline-block", whiteSpace: "nowrap" }}
				>
					{word.map((letter, letterIndex) => {
						const index =
							words
								.slice(0, wordIndex)
								.reduce((acc, w) => acc + w.length, 0) +
							letterIndex;

						return (
							<span
								key={`letter-${index}-${letter}`}
								style={letterStyles[index]}
								className="transform transition-opacity will-change-transform"
							>
								{letter}
							</span>
						);
					})}
					<span style={{ display: "inline-block", width: "0.3em" }}>
						&nbsp;
					</span>
				</span>
			))}
		</p>
	);
};

export default SplitText;
