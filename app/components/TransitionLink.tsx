"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

export function TransitionLink({
	href,
	children,
	...props
}: ComponentProps<typeof Link>) {
	const router = useRouter();

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();

		// View Transitions APIのサポートチェック
		if (!document.startViewTransition) {
			router.push(href.toString());
			return;
		}

		// トランジションを開始
		document.startViewTransition(() => {
			router.push(href.toString());
		});
	};

	return (
		<Link href={href} onClick={handleClick} {...props}>
			{children}
		</Link>
	);
}
