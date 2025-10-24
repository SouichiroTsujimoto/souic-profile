"use client";

import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CloseButton() {
	return (
		<Link
			href="/portfolio"
			className="absolute right-5 text-xs text-gray-800 hover:text-gray-600 transition cursor-pointer"
		>
			<XIcon className="w-5 h-5" />
		</Link>
	);
}
