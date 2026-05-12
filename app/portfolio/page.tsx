import { homePortfolioListHref } from "@/app/lib/homePortfolioNav";
import { permanentRedirect } from "next/navigation";

export default function PortfolioRootRedirect() {
	permanentRedirect(homePortfolioListHref());
}
