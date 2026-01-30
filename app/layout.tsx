"use client";
import "./globals.css";
import "./styles.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<title>wuhu1sland</title>
			</head>
			<body>
				{children}
			</body>
		</html>
	);
}
