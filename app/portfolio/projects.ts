// プロジェクトデータの型定義
export interface Project {
	id: number;
	path: string;
	title: string;
	description: string;
	images: string[]; // 単一のimageUrlから配列に変更
	technologies: string[];
	githubUrl?: string;
	githubUrlText?: string;
	githubUrl2?: string;
	githubUrl2Text?: string;
	siteUrl?: string;
	docsUrl?: string;
	docsUrlText?: string;
	movieUrl?: string;
	installUrl?: string;
	installUrlText?: string;
	installUrl2?: string;
	installUrl2Text?: string;
	year: string;
}

// サンプルプロジェクトデータ
export const projects: Project[] = [
	{
		id: 0,
		path: "",
		title: "",
		description: "",
		images: ["/white.png"],
		technologies: [""],
		year: "2025",
	},
	{
		id: 0.3,
		path: "Astrobit",
		title: "Astrobit",
		description:
			"AstroのislandとしてMoonBitでUIを書くためのインテグレーションです。mizchi/signalsによる更新とSSR/ハイドレーションに対応しています。",
		images: ["/astrobit6.webp", "/astrobit3.webp"],
		technologies: ["MoonBit", "Astro"],
		githubUrl: "https://github.com/SouichiroTsujimoto/astrobit",
		githubUrlText: "GitHub",
		installUrl: "https://mooncakes.io/docs/SouichiroTsujimoto/astrobit",
		installUrlText: "mooncakes.io",
		siteUrl: "https://astrobit-sample.vercel.app/",
		year: "2026",
	},
	{
		id: 0.4,
		path: "Dialup",
		title: "Dialup",
		description:
			"WebSocket-firstかつ HTTP MCP API を自動生成する Elixir Webフレームワークです。\n1タブにつき1つの GenServer がサーバー側に状態を持ち、ページ遷移をまたいでセッションが継続します。\n\ndialup_action と declare_action を書くだけで tools/list や tools/call が生成されます。\nブラウザの WebSocket イベントと AI エージェントからの tools/call は同じ handle_event/3 で処理するため、REST を別途設計する必要がありません。\n\nファイルベースルーティングと session/assigns の分離により Next.js ライクな開発体験を提供し、DOM 更新は idiomorph が担います。",
		images: ["/dialup4.webp", "/dialup2.webp", "/dialup.webp"],
		technologies: ["Elixir", "idiomorph", "MCP"],
		githubUrl: "https://github.com/SouichiroTsujimoto/dialup",
		githubUrlText: "GitHub",
		docsUrl: "https://dialup.hexdocs.pm/",
		docsUrlText: "Hex Docs",
		siteUrl: "https://dialup-framework.org",
		year: "2026",
	},
	{
		id: 0.5,
		path: "Optime",
		title: "Optime",
		description:
			"RSSを用いた投票結果の通知機能や、settings.jsonによる投票設定などの機能を持つ、調整さんライクな予定投票サイトです。\n\nSF研究会での上映会の日程決定に使うことを目的に作成し始めました。\n\nバックエンドはAWSの勉強も兼ねて、マルチAZ構成で構築しています。\n\n【工事中】(AWS費用が思ったより嵩んだため、一時的にバックエンドを停止中です。)",
		images: [
			"/Optime-1.webp",
			"/Optime-2.webp",
			"/optime-backend-aws.webp",
		],
		technologies: ["Go", "AWS", "Typescript", "Next.js"],
		githubUrl: "https://github.com/SouichiroTsujimoto/Optime",
		githubUrlText: "GitHub (Frontend)",
		githubUrl2: "https://github.com/SouichiroTsujimoto/Optime-backend",
		githubUrl2Text: "GitHub (Backend)",
		year: "2025",
	},
	{
		id: 1,
		path: "DUET-Plus",
		title: "DUET+",
		description:
			"同志社大学の学生用ポータルサイトDUETに、より詳細な情報を表示させます。\n\n自身の成績を確認できるページに、各授業の成績分布情報や、同じ授業を受けた生徒の目安GPAなどを表示します。\n\nパソコン向けにはChrome、スマホ向けにはiOSのSafariの拡張機能として公開しています",
		images: ["/D+.webp", "/duet+.webp"],
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
		path: "w1eX",
		title: "w1eX",
		description:
			"数学などの授業のノート作成に特化したマークアップ言語です。VSCodeの拡張機能として提供され、.w1exファイルの保存時にリアルタイムでノートを生成します。\n\nMarkDownのような既存のマークアップ言語との差別化として、視覚的なノート作成に特化しています。数学の授業でのノート作成に自分で使用するために作りました。",
		images: ["/w1ex5.webp"],
		technologies: ["Typescript", "VSCode Extension"],
		githubUrl: "https://github.com/SouichiroTsujimoto/w1eX",
		installUrl:
			"https://marketplace.visualstudio.com/items?itemName=SouichiroTsujimoto.w1ex",
		installUrlText: "VSCode Marketplace",
		year: "2024",
	},
	{
		id: 3,
		path: "w1key",
		title: "自主設計 分割キーボード",
		description:
			"『自作キーボード設計ガイド』という本を参考に作成しました。設計時にミスをしまくったのと、元々作ること自体が目的だったので常用はせず。",
		images: ["/w1key.webp", "/w1key-schematic.webp", "/w1key-pcb.webp"],
		technologies: ["KiCAD", "QMK Toolbox"],
		movieUrl: "https://x.com/wuhu1sland/status/1970215175161815332",
		year: "2025",
	},
	{
		id: 4,
		path: "1000os",
		title: "OS in 1,000 Lines",
		description:
			"『OS in 1,000 Lines』というサイトに沿って、RISC-V向けの小規模OSを作成しました。\n\nサイトに載っていない内容として、簡易的なディレクトリ構造とcd, ls, pwd等のコマンドを追加しました。",
		images: ["/1000os.webp"],
		technologies: ["C", "RISC-V"],
		movieUrl: "https://x.com/wuhu1sland/status/1969442391745839255",
		year: "2025",
	},
	{
		id: 5,
		path: "souic-profile",
		title: "souic-profile",
		description: "このサイトです。",
		images: ["/souic-profile4.webp"],
		technologies: ["Typescript", "Next.js", "Tailwind CSS"],
		siteUrl: "/",
		year: "2025",
	},
	{
		id: 7,
		path: "dpmap",
		title: "同志社大学京田辺キャンパス 略称対応マップ",
		description:
			"同志社大学は各建物に非常に魅力的な名称を付けています。さらに、シラバス等では簡潔でルールのない略称が使われているため、略称から元の建物を推測するには豊かな想像力が必要です。\n\nそこで、建物名と略称とその位置を対応付けたマップを作成しました。",
		images: ["/dpmap.webp"],
		technologies: ["Javascript", "Cloudflare Pages"],
		siteUrl: "https://dpmap-kyotanabe-campus.pages.dev",
		year: "2024",
	},
	{
		id: 8,
		path: "grid",
		title: "Grid",
		description: "2020年度SecHack365で制作したプログラミング言語です。",
		images: ["/Grid.webp"],
		technologies: ["Nim", "C++"],
		siteUrl: "https://sechack365.nict.go.jp/achievement/2020/#c03",
		githubUrl: "https://github.com/SouichiroTsujimoto/Grid",
		year: "2020",
	},
];
