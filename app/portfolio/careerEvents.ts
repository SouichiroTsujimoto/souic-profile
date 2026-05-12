export interface CareerEvent {
	date: string; // "YYYY/MM" format
	title: string;
	description?: string;
	icon: string; // emoji or icon
	link?: string; // optional external URL
}

export const careerEvents: CareerEvent[] = [
	{
		date: "2026/05",
		title: "Acompany internship",
		// description:
		// 	"JANOG57 Meeting NOCにて、ServerチームDHCP班として参加しました。",
		icon: "🅰",
		link: "https://www.janog.gr.jp/meeting/janog57/noc/",
	},
	{
		date: "2026/02",
		title: "JANOG57 NOC",
		description:
			"JANOG57 Meeting NOCにて、ServerチームDHCP班として参加しました。",
		icon: "🐙",
		link: "https://www.janog.gr.jp/meeting/janog57/noc/",
	},
	{
		date: "2025/08",
		title: "LINEヤフー internship",
		description:
			"2025年度のサマーインターンシップで、『セキュリティプラットフォーム（認証・認可、暗号鍵、電子証明書）の開発・運用』コースに参加しました。",
		icon: "💻",
		link: "https://techblog.lycorp.co.jp/ja/20251015a",
	},
	{
		date: "2024/06",
		title: "応用情報技術者試験",
		description:
			"2024年4月に行われた応用情報技術者試験を受験し合格しました。",
		icon: "📋",
	},
	{
		date: "2024/04",
		title: "大学入学",
		description: "同志社大学理工学部 数理システム学科に入学しました。",
		icon: "🏫",
	},
	{
		date: "2024/02",
		title: "Hashport internship",
		description:
			"Typescriptを用いたライブラリ開発などの業務",
		icon: "🔑",
	},
];
