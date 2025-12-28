import type { Metadata } from "next";
import ProfileContent from "./ProfileContent";

export const metadata: Metadata = {
	title: "プロフィール | Portfolio",
	description: "辻本宗一郎のプロフィール",
};

export default function ProfilePage() {
	return <ProfileContent />;
}

