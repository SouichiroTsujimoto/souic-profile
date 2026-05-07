/** X / Zenn 等で使う公開ハンドル */
export const SITE_PUBLIC_HANDLE = "wuhu1sland";

/** 日本語の表示名 */
export const SITE_DISPLAY_NAME_JA = "辻本宗一郎";

/** OGP / favicon / ポートフォリオヒーロー等で使うプロフィール画像 */
export const SITE_PROFILE_AVATAR_SRC = "/icon2.webp";

export const SITE_METADATA_DESCRIPTION = `${SITE_DISPLAY_NAME_JA}のプロフィールサイト`;

export const PROFILE_PAGE_METADATA_DESCRIPTION = `${SITE_DISPLAY_NAME_JA}のプロフィール`;

export const CAREER_PAGE_METADATA_DESCRIPTION = `${SITE_DISPLAY_NAME_JA}のキャリアタイムライン`;

/** プロフィール表示・年齢計算で共有する生年月日（YYYY-MM-DD） */
export const PROFILE_BIRTH_DATE_ISO = "2005-05-07";

export function calculateAge(asOf: Date = new Date()): number {
	const birthDate = new Date(PROFILE_BIRTH_DATE_ISO);
	let age = asOf.getFullYear() - birthDate.getFullYear();
	const monthDiff = birthDate.getMonth() - asOf.getMonth();

	if (
		monthDiff > 0 ||
		(monthDiff === 0 && birthDate.getDate() > asOf.getDate())
	) {
		age--;
	}

	return age;
}

/** 「2005年5月7日」形式（PROFILE_BIRTH_DATE_ISO と整合） */
export function formatProfileBirthDateJa(): string {
	const [y, m, d] = PROFILE_BIRTH_DATE_ISO.split("-").map(Number);
	return `${y}年${m}月${d}日`;
}

/** 所属（ヒーローは改行、詳細は1行に結合して表示） */
export const PROFILE_AFFILIATION_SCHOOL_LINE_1 = "同志社大学 理工学部";
export const PROFILE_AFFILIATION_SCHOOL_LINE_2 = "数理システム学科 3回生";
export const PROFILE_AFFILIATION_DSFA = "同志社SF研究会(DSFA) 2025年度会長";
export const PROFILE_AFFILIATION_KMC = "京大マイコンクラブ(KMC) 49代入会";

export function profileUniversityOneLine(): string {
	return `${PROFILE_AFFILIATION_SCHOOL_LINE_1} ${PROFILE_AFFILIATION_SCHOOL_LINE_2}`;
}

export const PROFILE_MAIN_SKILL_TAGS = [
	"TypeScript",
	"Go",
	"Rust",
	"JavaScript",
	"C++",
	"Next.js",
	"AWS",
	"Kea/Stork",
] as const;
