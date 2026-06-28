import HomeCard from "@/app/components/HomeCard";
import HomeScrollOnPortfolioReturn from "@/app/components/HomeScrollOnPortfolioReturn";
import SaveHomeScrollBeforePortfolioNav from "@/app/components/SaveHomeScrollBeforePortfolioNav";
import ThemeToggle from "@/app/components/ThemeToggle";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import styles from "./home.module.css";

const PortfolioLandingSection = dynamic(
	() => import("@/app/portfolio/PortfolioLandingSection"),
	{ ssr: true },
);

export default function Page() {
	return (
		<>
			<SaveHomeScrollBeforePortfolioNav />
			<Suspense fallback={null}>
				<HomeScrollOnPortfolioReturn />
			</Suspense>
			<section id="top" className={styles.homeContainer}>
				<ThemeToggle />
				<HomeCard />
			</section>
			<PortfolioLandingSection />
		</>
	);
}
