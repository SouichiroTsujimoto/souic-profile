"use client";

import { useEffect, useRef, useState } from "react";

interface SplitTextProps {
	text?: string;
	className?: string;
	delay?: number;
	threshold?: number;
	rootMargin?: string;
	textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
}

const SplitText: React.FC<SplitTextProps> = ({
	text = "",
	className = "",
	delay = 100,
	threshold = 0.1,
	rootMargin = "-100px",
	textAlign = "center",
}) => {
	const words = text.split(" ").map((word) => word.split(""));
	const [inView, setInView] = useState(false);
	const ref = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.unobserve(entry.target);
				}
			},
			{ threshold, rootMargin },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, [threshold, rootMargin]);

	let globalIndex = 0;

	return (
		<p
			ref={ref}
			className={`split-parent overflow-hidden inline ${inView ? "split-in" : ""} ${className}`}
			style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
		>
			{words.map((word, wordIndex) => (
				<span
					key={`word-${wordIndex}-${word.join("")}`}
					style={{ display: "inline-block", whiteSpace: "nowrap" }}
				>
					{word.map((letter) => {
						const i = globalIndex++;
						return (
							<span
								key={`letter-${i}-${letter}`}
								className="split-letter"
								style={
									{
										"--split-delay": `${i * delay}ms`,
									} as React.CSSProperties
								}
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
