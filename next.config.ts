import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	compress: true,
	poweredByHeader: false,
	images: {
		formats: ["image/avif", "image/webp"],
		deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536],
		imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 384],
		minimumCacheTTL: 60 * 60 * 24 * 30,
		remotePatterns: [
			{ protocol: "https", hostname: "res.cloudinary.com" },
			{ protocol: "https", hostname: "static.zenn.studio" },
			{ protocol: "https", hostname: "qiita-user-contents.imgix.net" },
			{ protocol: "https", hostname: "assets.st-note.com" },
			{ protocol: "https", hostname: "techblog.lycorp.co.jp" },
		],
	},
	experimental: {
		optimizePackageImports: ["@heroicons/react"],
	},
	async headers() {
		return [
			{
				source: "/:path*\\.(webp|png|jpg|jpeg|svg|ico)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},
};

export default nextConfig;
