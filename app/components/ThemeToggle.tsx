"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "./ThemeProvider";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
	const { resolvedTheme, setTheme, mounted } = useTheme();

	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	// マウント前は何も表示しない（ハイドレーションエラー防止）
	if (!mounted) {
		return (
			<div className={styles.themeToggle} style={{ visibility: "hidden" }}>
				<span className={styles.themeToggleTrack}>
					<span className={styles.themeToggleThumb} />
				</span>
			</div>
		);
	}

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className={styles.themeToggle}
			aria-label={`${resolvedTheme === "dark" ? "ライト" : "ダーク"}モードに切り替え`}
		>
			<span className={styles.themeToggleTrack}>
				<span
					className={`${styles.themeToggleThumb} ${resolvedTheme === "dark" ? styles.themeToggleThumbDark : ""}`}
				>
					{resolvedTheme === "dark" ? (
						<MoonIcon className="w-3.5 h-3.5" />
					) : (
						<SunIcon className="w-3.5 h-3.5" />
					)}
				</span>
			</span>
		</button>
	);
}
