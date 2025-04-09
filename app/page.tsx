"use client";

import Link from "next/link";

import { useEffect, useRef, useState } from "react";

export default function Page() {
	const cardWrapperRef = useRef<HTMLDivElement | null>(null);
	const [isReturningToCenter, setIsReturningToCenter] = useState(false);
	const [bgColor, setBgColor] = useState(180);
	const maxTilt = 20;
	const rafIdRef = useRef<number | null>(null);

	// 初期化
	useEffect(() => {
		// 最初から3D効果を有効化
		setCardCenter();

		// 初期エフェクトを設定
		updateCard({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

		return () => {
			if (rafIdRef.current) {
				cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}
		};
	}, []);

	// カードを中央に戻す関数（イージング効果を追加）
	const setCardCenter = () => {
		if (!cardWrapperRef.current) return;

		const centerX = 0.5;
		const centerY = 0.5;

		// 現在の値を取得
		const wrapper = cardWrapperRef.current;
		const currentRatioX =
			Number.parseFloat(
				getComputedStyle(wrapper).getPropertyValue("--ratiox"),
			) || 0.5;
		const currentRatioY =
			Number.parseFloat(
				getComputedStyle(wrapper).getPropertyValue("--ratioy"),
			) || 0.5;
		const currentRx =
			Number.parseFloat(
				getComputedStyle(wrapper).getPropertyValue("--rx"),
			) || 0;
		const currentRy =
			Number.parseFloat(
				getComputedStyle(wrapper).getPropertyValue("--ry"),
			) || 0;
		const currentPosX =
			Number.parseFloat(
				getComputedStyle(wrapper).getPropertyValue("--posx"),
			) || 50;
		const currentPosY =
			Number.parseFloat(
				getComputedStyle(wrapper).getPropertyValue("--posy"),
			) || 50;

		// アニメーションの開始時間
		const startTime = performance.now();
		const duration = 800; // ミリ秒単位の期間（長めにして滑らかに）

		// イージング関数（easeOutCubic）
		const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

		// アニメーションフレーム内で値を更新
		const animate = (time: number) => {
			const elapsed = time - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const easeProgress = easeOutCubic(progress);

			// 現在値と目標値の間を補間
			const newRatioX =
				currentRatioX + (centerX - currentRatioX) * easeProgress;
			const newRatioY =
				currentRatioY + (centerY - currentRatioY) * easeProgress;
			const newRx = currentRx * (1 - easeProgress); // 0に向かって
			const newRy = currentRy * (1 - easeProgress); // 0に向かって
			const newPosX = currentPosX + (50 - currentPosX) * easeProgress;
			const newPosY = currentPosY + (50 - currentPosY) * easeProgress;

			// 値を設定
			wrapper.style.setProperty("--ratiox", newRatioX.toString());
			wrapper.style.setProperty("--ratioy", newRatioY.toString());
			wrapper.style.setProperty("--mx", `${newRatioX * 100}%`);
			wrapper.style.setProperty("--my", `${newRatioY * 100}%`);
			wrapper.style.setProperty("--rx", `${newRx}deg`);
			wrapper.style.setProperty("--ry", `${newRy}deg`);
			wrapper.style.setProperty("--posx", `${newPosX}%`);
			wrapper.style.setProperty("--posy", `${newPosY}%`);

			// アニメーションが完了していない場合は次のフレームを要求
			if (progress < 1) {
				rafIdRef.current = requestAnimationFrame(animate);
			} else {
				// 最終値を確実に設定
				wrapper.style.setProperty("--ratiox", centerX.toString());
				wrapper.style.setProperty("--ratioy", centerY.toString());
				wrapper.style.setProperty("--mx", `${centerX * 100}%`);
				wrapper.style.setProperty("--my", `${centerY * 100}%`);
				wrapper.style.setProperty("--rx", "0deg");
				wrapper.style.setProperty("--ry", "0deg");
				wrapper.style.setProperty("--posx", "50%");
				wrapper.style.setProperty("--posy", "50%");
				rafIdRef.current = null;
			}
		};

		// アニメーションスタート
		if (rafIdRef.current) {
			cancelAnimationFrame(rafIdRef.current);
		}
		rafIdRef.current = requestAnimationFrame(animate);

		// トランジションクラスを追加
		setIsReturningToCenter(true);
	};

	const updateCard = ({ x, y }: { x: number; y: number }) => {
		if (!cardWrapperRef.current) return;

		const wrapper = cardWrapperRef.current;

		// トランジションクラスを削除（マウス移動時は即時反映）
		setIsReturningToCenter(false);

		const BOUNDS = wrapper.getBoundingClientRect();

		// 要素の中心位置を算出
		const centerX = BOUNDS.width / 2;
		const centerY = BOUNDS.height / 2;

		// ポインターのカードの中心からの位置を算出
		const pointerX = x - BOUNDS.x;
		const pointerY = y - BOUNDS.y;

		// ポインターのカードの中心からの度合い
		const ratioX = (pointerX - centerX) / centerX;
		const ratioY = (pointerY - centerY) / centerY;

		// 必要最小限のCSS変数のみ更新
		wrapper.style.setProperty("--ratiox", (ratioX + 0.5).toString());
		wrapper.style.setProperty("--ratioy", (ratioY + 0.5).toString());

		const mX = (ratioX + 0.5) * 100;
		const mY = (ratioY + 0.5) * 100;
		wrapper.style.setProperty("--mx", `${mX}%`);
		wrapper.style.setProperty("--my", `${mY}%`);

		// 回転角度を計算
		const rotateY = ratioX * maxTilt;
		const rotateX = -ratioY * maxTilt;
		wrapper.style.setProperty("--rx", `${rotateX}deg`);
		wrapper.style.setProperty("--ry", `${rotateY}deg`);

		// ハイライト位置を計算
		const posX = 50 + ratioX * 50;
		const posY = 50 + ratioY * 50;
		wrapper.style.setProperty("--posx", `${posX}%`);
		wrapper.style.setProperty("--posy", `${posY}%`);
	};

	// アニメーションフレームでの更新を管理
	const updateCardPosition = (e: React.MouseEvent) => {
		if (rafIdRef.current) {
			cancelAnimationFrame(rafIdRef.current);
		}

		rafIdRef.current = requestAnimationFrame(() => {
			updateCard({ x: e.clientX, y: e.clientY });
			rafIdRef.current = null;
		});
	};

	// マウスがカードから離れたときに中央に戻るハンドラー
	const handleMouseLeave = () => {
		if (rafIdRef.current) {
			cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = null;
		}
		setCardCenter();
	};

	return (
		<>
			<div
				className={`card-wrapper ${isReturningToCenter ? "return-to-center" : ""}`}
				ref={cardWrapperRef}
				onMouseMove={updateCardPosition}
				onMouseLeave={handleMouseLeave}
			>
				{/* カラーレイヤーを下に配置 */}
				<div
					className="card color"
					style={{
						zIndex: 20,
						pointerEvents: "none",
					}}
				/>

				{/* メインのカードコンテンツ - 前面レイヤー */}
				<div
					className="card main-content"
					style={{
						position: "relative",
					}}
				>
					<div
						className="card-content"
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							height: "100%",
							padding: "20px",
						}}
					>
						{/* 画像を背景として配置 - 中間のレイヤー */}
						<img
							src="/souic8.png"
							alt="カード画像"
							className="color"
							style={{
								zIndex: 10,
								position: "absolute",
								pointerEvents: "none",
							}}
						/>

						<Link
							className="transition-colors"
							href="https://x.com/wuhu1sland"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								position: "absolute",
								top: "37%",
								left: "20%",
								right: "20%",
								textAlign: "center",
								zIndex: 20,
							}}
						>
							<img src="/X.png" alt="X" />
							{/* X : @wuhu1sland */}
						</Link>

						<Link
							className="transition-colors"
							href="https://www.instagram.com/utf.16/"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								textDecoration: "none",
								position: "absolute",
								top: "47%",
								left: "20%",
								right: "20%",
								textAlign: "center",
								zIndex: 20,
							}}
						>
							<img src="/insta.png" alt="instagram" />
						</Link>

						<Link
							className="transition-colors"
							href="https://github.com/SouichiroTsujimoto"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								textDecoration: "none",
								position: "absolute",
								top: "57%",
								left: "20%",
								right: "20%",
								textAlign: "center",
								zIndex: 20,
							}}
						>
							<img src="/github.png" alt="github" />
						</Link>
					</div>

					{/* ハイライトレイヤーを最上部に配置、ポインターイベントを無効化 */}
					{/* <div className="card highlight" style={{ zIndex: 5 }} /> */}
				</div>
			</div>
		</>
	);
}
