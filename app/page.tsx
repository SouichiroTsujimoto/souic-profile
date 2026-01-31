"use client";

import ThemeToggle from "@/app/components/ThemeToggle";
import { TransitionLink } from "@/app/components/TransitionLink";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";

export default function Page() {
	const cardWrapperRef = useRef<HTMLDivElement | null>(null);
	const [isReturningToCenter, setIsReturningToCenter] = useState(false);
	const maxTilt = 15;
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
		setCardCenter();
		updateCard({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

		return () => {
			if (rafIdRef.current) {
				cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}
		};
	}, []);

	// カードを中央に戻す関数
	const setCardCenter = () => {
		if (!cardWrapperRef.current) return;

		const centerX = 0.5;
		const centerY = 0.5;

		const currentRatioX = cardStyles.ratioX;
		const currentRatioY = cardStyles.ratioY;
		const currentRx = Number.parseFloat(cardStyles.rotateX) || 0;
		const currentRy = Number.parseFloat(cardStyles.rotateY) || 0;
		const currentPosX = Number.parseFloat(cardStyles.posX) || 50;
		const currentPosY = Number.parseFloat(cardStyles.posY) || 50;

		const startTime = performance.now();
		const duration = 800;

		const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

		const animate = (time: number) => {
			const elapsed = time - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const easeProgress = easeOutCubic(progress);

			const newRatioX =
				currentRatioX + (centerX - currentRatioX) * easeProgress;
			const newRatioY =
				currentRatioY + (centerY - currentRatioY) * easeProgress;
			const newRx = currentRx * (1 - easeProgress);
			const newRy = currentRy * (1 - easeProgress);
			const newPosX = currentPosX + (50 - currentPosX) * easeProgress;
			const newPosY = currentPosY + (50 - currentPosY) * easeProgress;

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

			if (progress < 1) {
				rafIdRef.current = requestAnimationFrame(animate);
			} else {
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

		if (rafIdRef.current) {
			cancelAnimationFrame(rafIdRef.current);
		}
		rafIdRef.current = requestAnimationFrame(animate);
		setIsReturningToCenter(true);
	};

	const updateCard = ({ x, y }: { x: number; y: number }) => {
		if (!cardWrapperRef.current) return;

		const wrapper = cardWrapperRef.current;
		setIsReturningToCenter(false);

		const BOUNDS = wrapper.getBoundingClientRect();
		const centerX = BOUNDS.width / 2;
		const centerY = BOUNDS.height / 2;
		const pointerX = x - BOUNDS.x;
		const pointerY = y - BOUNDS.y;
		const ratioX = (pointerX - centerX) / centerX;
		const ratioY = (pointerY - centerY) / centerY;
		const rotateY = ratioX * maxTilt;
		const rotateX = -ratioY * maxTilt;
		const posX = 50 + ratioX * 50;
		const posY = 50 + ratioY * 50;

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

	const updateCardPosition = (e: React.MouseEvent) => {
		if (rafIdRef.current) {
			cancelAnimationFrame(rafIdRef.current);
		}

		rafIdRef.current = requestAnimationFrame(() => {
			updateCard({ x: e.clientX, y: e.clientY });
			rafIdRef.current = null;
		});
	};

	const handleMouseLeave = () => {
		if (rafIdRef.current) {
			cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = null;
		}
		setCardCenter();
	};

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
		<div className={styles.homeContainer}>
			<ThemeToggle />
			<div
				className={`${styles.cardWrapper} ${isReturningToCenter ? styles.cardWrapperReturning : ""}`}
				ref={cardWrapperRef}
				onPointerMove={updateCardPosition}
				onPointerLeave={handleMouseLeave}
				style={cardWrapperStyle}
			>
				{/* 名札カード本体 */}
				<div className={styles.card}>
					<div className={styles.cardBackdrop} aria-hidden="true" />
					{/* 名前バー */}
					<div className={styles.nameBar}>
						<span className={styles.nameMeta}>2005-05-07</span>
					</div>

					{/* カードコンテンツ */}
					<div className={styles.cardContent}>
						{/* アイコン */}
						<div className={styles.iconFrame}>
							<Image
								src="/0x24.png"
								alt="icon"
								width={300}
								height={300}
							/>
						</div>

						{/* フッター */}
						<div className={styles.badgeFooter}>
							<TransitionLink
								href="/portfolio"
								className={styles.badgeButton}
							>
								&gt; Portfolio
							</TransitionLink>
						</div>

						{/* タイトル */}
						<h1 className={styles.badgeTitle}>
							Tsujimoto Souichiro
						</h1>

						{/* 説明文 */}
						<p className={styles.badgeDescription}>
							Student at Doshisha Univ. Mathematical Sciences
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
