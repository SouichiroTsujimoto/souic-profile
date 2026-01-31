"use client";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { PageTransitionProvider } from "./components/PageTransitionProvider";
import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html lang="en" suppressHydrationWarning>
				<head>
					<title>wuhu1sland</title>
				</head>
				<body>
					<ThemeProvider>
						<PageTransitionProvider>
							{children}
						</PageTransitionProvider>
					</ThemeProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}
