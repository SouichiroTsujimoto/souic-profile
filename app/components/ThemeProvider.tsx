"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
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

const getSystemTheme = (): "light" | "dark" => {
	if (typeof window === "undefined") return "dark";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

const readResolvedFromDom = (): "light" | "dark" => {
	if (typeof document === "undefined") return "dark";
	return document.documentElement.classList.contains("light")
		? "light"
		: "dark";
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>("system");
	const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() =>
		readResolvedFromDom(),
	);
	const [mounted, setMounted] = useState(false);
	const themeRef = useRef<Theme>("system");

	const applyTheme = useCallback((next: Theme) => {
		const resolved = next === "system" ? getSystemTheme() : next;
		const root = document.documentElement;
		if (!root.classList.contains(resolved)) {
			root.classList.remove("light", "dark");
			root.classList.add(resolved);
		}
		setResolvedTheme(resolved);
	}, []);

	const setTheme = useCallback(
		(next: Theme) => {
			themeRef.current = next;
			setThemeState(next);
			try {
				localStorage.setItem("theme", next);
			} catch {}
			applyTheme(next);
		},
		[applyTheme],
	);

	useEffect(() => {
		const saved = (() => {
			try {
				return localStorage.getItem("theme") as Theme | null;
			} catch {
				return null;
			}
		})();
		const initial: Theme = saved ?? "system";
		themeRef.current = initial;
		setThemeState(initial);
		applyTheme(initial);
		setMounted(true);

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => {
			if (themeRef.current === "system") {
				applyTheme("system");
			}
		};
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [applyTheme]);

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
