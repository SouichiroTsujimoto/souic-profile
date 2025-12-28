import type { Metadata } from "next";
import CareerContent from "./CareerContent";

export const metadata: Metadata = {
	title: "キャリア | Portfolio",
	description: "辻本宗一郎のキャリアタイムライン",
};

export default function CareerPage() {
	return <CareerContent />;
}

