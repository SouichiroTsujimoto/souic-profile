import HomeCard from "@/app/components/HomeCard";
import ThemeToggle from "@/app/components/ThemeToggle";
import styles from "./home.module.css";

export default function Page() {
	return (
		<div className={styles.homeContainer}>
			<ThemeToggle />
			<HomeCard />
		</div>
	);
}
