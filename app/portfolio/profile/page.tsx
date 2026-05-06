import type { Metadata } from "next";
import { preload } from "react-dom";
import ProfileContent from "./ProfileContent";

export const metadata: Metadata = {
	title: "プロフィール | Portfolio",
	description: "辻本宗一郎のプロフィール",
};

export default function ProfilePage() {
	preload("/icon2.webp", { as: "image" });
	return <ProfileContent />;
}
