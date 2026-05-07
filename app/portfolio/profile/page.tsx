import {
	PROFILE_PAGE_METADATA_DESCRIPTION,
	SITE_PROFILE_AVATAR_SRC,
} from "@/app/lib/siteProfile";
import type { Metadata } from "next";
import { preload } from "react-dom";
import ProfileContent from "./ProfileContent";

export const metadata: Metadata = {
	title: "プロフィール | Portfolio",
	description: PROFILE_PAGE_METADATA_DESCRIPTION,
};

export default function ProfilePage() {
	preload(SITE_PROFILE_AVATAR_SRC, { as: "image" });
	return <ProfileContent />;
}
