import { CAREER_PAGE_METADATA_DESCRIPTION } from "@/app/lib/siteProfile";
import type { Metadata } from "next";
import CareerContent from "./CareerContent";

export const metadata: Metadata = {
	title: "キャリア | Portfolio",
	description: CAREER_PAGE_METADATA_DESCRIPTION,
};

export default function CareerPage() {
	return <CareerContent />;
}
