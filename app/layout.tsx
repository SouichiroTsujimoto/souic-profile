import {
	SITE_METADATA_DESCRIPTION,
	SITE_PROFILE_AVATAR_SRC,
	SITE_PUBLIC_HANDLE,
} from "@/app/lib/siteProfile";
import type { Metadata, Viewport } from "next";
import Providers from "./components/Providers";
import "./globals.css";

export const metadata: Metadata = {
	title: SITE_PUBLIC_HANDLE,
	description: SITE_METADATA_DESCRIPTION,
	icons: { icon: SITE_PROFILE_AVATAR_SRC },
};

export const viewport: Viewport = {
	colorScheme: "dark light",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f4f5f7" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
};

const themeInitScript = `(()=>{try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='light'||s==='dark'?s:(m?'dark':'light');document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: theme bootstrap script must run before hydration to avoid FOUC
					dangerouslySetInnerHTML={{ __html: themeInitScript }}
				/>
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
