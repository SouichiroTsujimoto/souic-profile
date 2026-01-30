import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import styles from "../portfolio.module.css";

export default function CloseButton() {
	const router = useTransitionRouter();

	return (
		<button
			type="button"
			className={styles.overlayCloseButton}
			onClick={() => router.push("/portfolio")}
			aria-label="閉じる"
		>
			<XIcon className="w-5 h-5" />
		</button>
	);
}
