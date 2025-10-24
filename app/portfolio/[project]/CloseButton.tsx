import { TransitionLink } from "@/app/components/TransitionLink";
import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";

export default function CloseButton() {
	return (
		<TransitionLink
			href="/portfolio"
			className="absolute right-5 text-xs text-gray-800 hover:text-gray-600 transition cursor-pointer"
		>
			<XIcon className="w-5 h-5" />
		</TransitionLink>
	);
}
