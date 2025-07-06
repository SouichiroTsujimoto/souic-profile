// プロジェクトデータの型定義
export interface Project {
	id: number;
	title: string;
	description: string;
	images: string[]; // 単一のimageUrlから配列に変更
	technologies: string[];
	githubUrl?: string;
	siteUrl?: string;
	installUrl?: string;
	installUrlText?: string;
	installUrl2?: string;
	installUrl2Text?: string;
	year: string;
}

// サンプルプロジェクトデータ
export const projects: Project[] = [
	{
		id: 1,
		title: "DUET+",
		description:
			"同志社大学の学生用ポータルサイトDUETに、より詳細な情報を表示させます。\n\n自身の成績を確認できるページに、各授業の成績分布情報や、同じ授業を受けた生徒の目安GPAなどを表示します。\n\nパソコン向けにはChrome、スマホ向けにはiOSのSafariの拡張機能として公開しています",
		images: ["/D+.png", "/duet+.png"],
		technologies: [
			"Typescript",
			"Chrome Extension",
			"Safari Extension",
			"Hono",
		],
		githubUrl: "https://github.com/SouichiroTsujimoto/duet-plus",
		installUrl:
			"https://chromewebstore.google.com/detail/mofjbejpdfdfkbiicjhimkodkijekjdk?utm_source=item-share-cb",
		installUrlText: "Chromeウェブストア",
		installUrl2: "https://apps.apple.com/jp/app/duet/id6743043491",
		installUrl2Text: "App Store (iOS)",
		year: "2024",
	},
	{
		id: 2,
		title: "w1eX",
		description:
			"数学などの授業のノート作成に特化したマークアップ言語です。VSCodeの拡張機能として提供され、.w1exファイルの保存時にリアルタイムでノートを生成します。\n\nMarkDownのような既存のマークアップ言語との差別化として、視覚的なノート作成に特化しています。数学の授業でのノート作成に自分で使用するために作りました。",
		images: ["/w1ex5.png"],
		technologies: ["Typescript", "VSCode Extension"],
		githubUrl: "https://github.com/SouichiroTsujimoto/w1eX",
		installUrl:
			"https://marketplace.visualstudio.com/items?itemName=SouichiroTsujimoto.w1ex",
		installUrlText: "VSCode Marketplace",
		year: "2024",
	},
	{
		id: 3,
		title: "souic-profile",
		description:
			"自身のプロフィールページです。このサイトの8割はCursor AgentでClaude3.7 Sonnetを用いて作りました。\n\nAgentはめちゃ便利でしたが、ReactやNext.jsの知識は正直全く身に付きませんでした。\n\n背景やテキストのアニメーションはreact bitsのものを使用しています。",
		images: ["/souic-profile4.png"],
		technologies: ["Typescript", "Next.js", "React", "Tailwind CSS", "Vercel"],
		siteUrl: "/",
		year: "2025",
	},
	{
		id: 4,
		title: "株式会社辻本エンジニアリング ホームページ",
		description:
			"株式会社辻本エンジニアリングの公式ホームページを制作しました。",
		images: ["/tsujimoto-eng4.png"],
		technologies: ["Typescript", "Astro", "Tailwind CSS", "Netlify"],
		siteUrl: "https://tsujimoto-engineering.netlify.app",
		year: "2024",
	},
	{
		id: 5,
		title: "同志社大学京田辺キャンパス 略称対応マップ",
		description:
			"同志社大学は各建物に非常に魅力的な名称を付けています。さらに、シラバス等では簡潔でルールのない略称が使われているため、略称から元の建物を推測するには豊かな想像力が必要です。\n\nそこで、建物名と略称とその位置を対応付けたマップを作成しました。",
		images: ["/dpmap.png"],
		technologies: ["Javascript", "Cloudflare Pages"],
		siteUrl: "https://dpmap-kyotanabe-campus.pages.dev",
		year: "2024",
	},
	{
		id: 6,
		title: "Grid",
		description: "2020年度SecHack365で制作したプログラミング言語です。",
		images: ["/Grid.png"],
		technologies: ["Nim", "C++"],
		siteUrl: "https://sechack365.nict.go.jp/achievement/2020/#c03",
		githubUrl: "https://github.com/SouichiroTsujimoto/Grid",
		year: "2020",
	},
];
