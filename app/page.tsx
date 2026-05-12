import HomeCard from "@/app/components/HomeCard";
import HomeScrollOnPortfolioReturn from "@/app/components/HomeScrollOnPortfolioReturn";
import SaveHomeScrollBeforePortfolioNav from "@/app/components/SaveHomeScrollBeforePortfolioNav";
import ThemeToggle from "@/app/components/ThemeToggle";
import PortfolioLandingSection from "@/app/portfolio/PortfolioLandingSection";
import { Suspense } from "react";
import styles from "./home.module.css";

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
