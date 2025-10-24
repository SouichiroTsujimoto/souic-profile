"use client";

import { TransitionLink } from "@/app/components/TransitionLink";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Page() {
	const cardWrapperRef = useRef<HTMLDivElement | null>(null);
	const [isReturningToCenter, setIsReturningToCenter] = useState(false);
	const maxTilt = 20;
	const rafIdRef = useRef<number | null>(null);

	// CSSカスタムプロパティのための状態
	const [cardStyles, setCardStyles] = useState({
		ratioX: 0.5,
		ratioY: 0.5,
		mX: "50%",
		mY: "50%",
		rotateX: "0deg",
		rotateY: "0deg",
		posX: "50%",
		posY: "50%",
	});

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
		const currentRatioX = cardStyles.ratioX;
		const currentRatioY = cardStyles.ratioY;
		const currentRx = Number.parseFloat(cardStyles.rotateX) || 0;
		const currentRy = Number.parseFloat(cardStyles.rotateY) || 0;
		const currentPosX = Number.parseFloat(cardStyles.posX) || 50;
		const currentPosY = Number.parseFloat(cardStyles.posY) || 50;

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
			setCardStyles({
				ratioX: newRatioX,
				ratioY: newRatioY,
				mX: `${newRatioX * 100}%`,
				mY: `${newRatioY * 100}%`,
				rotateX: `${newRx}deg`,
				rotateY: `${newRy}deg`,
				posX: `${newPosX}%`,
				posY: `${newPosY}%`,
			});

			// アニメーションが完了していない場合は次のフレームを要求
			if (progress < 1) {
				rafIdRef.current = requestAnimationFrame(animate);
			} else {
				// 最終値を確実に設定
				setCardStyles({
					ratioX: centerX,
					ratioY: centerY,
					mX: `${centerX * 100}%`,
					mY: `${centerY * 100}%`,
					rotateX: "0deg",
					rotateY: "0deg",
					posX: "50%",
					posY: "50%",
				});
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

		// 回転角度を計算
		const rotateY = ratioX * maxTilt;
		const rotateX = -ratioY * maxTilt;

		// ハイライト位置を計算
		const posX = 50 + ratioX * 50;
		const posY = 50 + ratioY * 50;

		// 状態を更新
		setCardStyles({
			ratioX: ratioX + 0.5,
			ratioY: ratioY + 0.5,
			mX: `${(ratioX + 0.5) * 100}%`,
			mY: `${(ratioY + 0.5) * 100}%`,
			rotateX: `${rotateX}deg`,
			rotateY: `${rotateY}deg`,
			posX: `${posX}%`,
			posY: `${posY}%`,
		});
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

	// CSSカスタムプロパティをインラインスタイルに変換
	const cardWrapperStyle = {
		"--ratiox": cardStyles.ratioX,
		"--ratioy": cardStyles.ratioY,
		"--mx": cardStyles.mX,
		"--my": cardStyles.mY,
		"--rx": cardStyles.rotateX,
		"--ry": cardStyles.rotateY,
		"--posx": cardStyles.posX,
		"--posy": cardStyles.posY,
	} as React.CSSProperties;

	return (
		<>
			<div
				className={`card-wrapper ${isReturningToCenter ? "return-to-center" : ""}`}
				ref={cardWrapperRef}
				onPointerMove={updateCardPosition}
				onPointerLeave={handleMouseLeave}
				style={cardWrapperStyle}
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
						<Image
							src="/newsouic.webp"
							alt="カード画像"
							className="color"
							style={{
								zIndex: 10,
								position: "absolute",
								pointerEvents: "none",
							}}
							width={500}
							height={700}
						/>

						<Image
							src="/icon.webp"
							alt="icon"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								position: "absolute",
								scale: "0.3",
								top: "-14%",
								zIndex: 20,
								textAlign: "center",
								filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))",
							}}
							width={400}
							height={400}
						/>

						<Image
							src="/tsujimoto8.webp"
							alt="text"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								position: "absolute",
								top: "10%",
								zIndex: 20,
								textAlign: "center",
								opacity: "0.8",
								scale: "0.65",
							}}
							width={600}
							height={150}
						/>

						<TransitionLink
							className="transition-colors"
							href="/portfolio"
							// target="_blank"
							rel="noopener noreferrer"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								position: "absolute",
								top: "52%",
								left: "20%",
								right: "20%",
								textAlign: "center",
								zIndex: 20,
							}}
						>
							<Image
								src="/portfolio2.webp"
								alt="portfolio"
								style={{
									filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))",
								}}
								width={300}
								height={60}
							/>
							{/* X : @wuhu1sland */}
						</TransitionLink>

						<TransitionLink
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
								top: "62%",
								left: "20%",
								right: "20%",
								textAlign: "center",
								zIndex: 20,
							}}
						>
							<Image
								src="/github2.webp"
								alt="github"
								style={{
									filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))",
								}}
								width={300}
								height={60}
							/>
						</TransitionLink>

						<TransitionLink
							className="transition-colors"
							href="https://x.com/wuhu1sland"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								textDecoration: "none",
								position: "absolute",
								top: "72%",
								left: "20%",
								right: "20%",
								textAlign: "center",
								zIndex: 20,
							}}
						>
							<Image
								src="/X2.webp"
								alt="X"
								style={{
									filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))",
								}}
								width={300}
								height={60}
							/>
						</TransitionLink>
					</div>

					{/* ハイライトレイヤーを最上部に配置、ポインターイベントを無効化 */}
					{/* <div className="card highlight" style={{ zIndex: 5 }} /> */}
				</div>
			</div>
		</>
	);
}
