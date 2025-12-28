import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";

export default function CloseButton() {
	const router = useTransitionRouter();

	return (
		<button
			type="button"
			className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
			onClick={() => router.push("/portfolio")}
			aria-label="閉じる"
		>
			<XIcon className="w-5 h-5" />
		</button>
	);
}
