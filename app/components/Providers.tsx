"use client";

import { ViewTransitions } from "next-view-transitions";
import { PageTransitionProvider } from "./PageTransitionProvider";
import { ThemeProvider } from "./ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ViewTransitions>
			<ThemeProvider>
				<PageTransitionProvider>{children}</PageTransitionProvider>
			</ThemeProvider>
		</ViewTransitions>
	);
}
