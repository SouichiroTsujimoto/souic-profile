"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
	theme: Theme;
	resolvedTheme: "light" | "dark";
	setTheme: (theme: Theme) => void;
	mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "system",
	resolvedTheme: "dark",
	setTheme: () => {},
	mounted: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>("system");
	const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
	const [mounted, setMounted] = useState(false);

	const getSystemTheme = useCallback((): "light" | "dark" => {
		if (typeof window === "undefined") return "dark";
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	}, []);

	const applyTheme = useCallback(
		(newTheme: Theme) => {
			const resolved = newTheme === "system" ? getSystemTheme() : newTheme;
			setResolvedTheme(resolved);

			const root = document.documentElement;
			root.classList.remove("light", "dark");
			root.classList.add(resolved);
		},
		[getSystemTheme],
	);

	const setTheme = useCallback(
		(newTheme: Theme) => {
			setThemeState(newTheme);
			localStorage.setItem("theme", newTheme);
			applyTheme(newTheme);
		},
		[applyTheme],
	);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as Theme | null;
		const initialTheme = savedTheme || "system";
		setThemeState(initialTheme);
		applyTheme(initialTheme);
		setMounted(true);

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => {
			if (theme === "system") {
				applyTheme("system");
			}
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [applyTheme, theme]);

	// システムテーマの変更を監視
	useEffect(() => {
		if (theme === "system") {
			applyTheme("system");
		}
	}, [theme, applyTheme]);

	const value = useMemo(
		() => ({ theme, resolvedTheme, setTheme, mounted }),
		[theme, resolvedTheme, setTheme, mounted],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
