"use client";

import NextLink from "next/link";
import { Link as ViewTransitionLink } from "next-view-transitions";
import type { ComponentProps } from "react";
import { usePageTransition } from "./PageTransitionProvider";

type LinkProps = ComponentProps<typeof NextLink>;

function isModifiedEvent(event: React.MouseEvent<HTMLAnchorElement>) {
	const target = event.currentTarget.getAttribute("target");
	return (
		(target && target !== "_self") ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey ||
		event.button === 1
	);
}

export function TransitionLink({ href, children, onClick, ...props }: LinkProps) {
	const { shouldUseFallback, startFallback } = usePageTransition();

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		if (onClick) {
			onClick(event);
		}
		if (event.defaultPrevented || isModifiedEvent(event)) {
			return;
		}
		if (shouldUseFallback) {
			startFallback();
		}
	};

	if (shouldUseFallback) {
		return (
			<NextLink href={href} onClick={handleClick} {...props}>
				{children}
			</NextLink>
		);
	}

	return (
		<ViewTransitionLink href={href} onClick={handleClick} {...props}>
			{children}
		</ViewTransitionLink>
	);
}
