"use client";

import ThemeToggle from "@/app/components/ThemeToggle";
import { TransitionLink } from "@/app/components/TransitionLink";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./home.module.css";

export default function Page() {
	const cardWrapperRef = useRef<HTMLDivElement | null>(null);
	const [isReturningToCenter, setIsReturningToCenter] = useState(false);
	const [showQr, setShowQr] = useState(false);
	const qrPanelId = useId();
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
				<div className={styles.card}>
					<div className={styles.cardInner}>
						<div className={styles.cardHeader}>
							<span className={styles.cardStage}>Basic</span>
							<span className={styles.cardMeta}>2005-05-07</span>
						</div>

						<div className={styles.cardTitleRow}>
							<h1 className={styles.cardName}>
								Tsujimoto Souichiro
							</h1>
							<div className={styles.cardHp}>
								<span
									className={styles.cardTypeOrb}
									aria-hidden="true"
								/>
							</div>
						</div>

						<div className={styles.cardArtFrame}>
							<div className={styles.cardArtInner}>
								<Image
									src="/icon-a.png"
									alt="icon"
									width={300}
									height={300}
									className={styles.cardArtImage}
								/>
							</div>
						</div>

						<div className={styles.cardInfoStrip}>
							<span className={styles.cardInfoText}>
								Student at Doshisha Univ. Mathematical Sciences
							</span>
						</div>

						<div className={styles.cardMoves}>
							<TransitionLink
								href="/portfolio"
								className={styles.moveRow}
							>
								<span
									className={styles.moveIcon}
									aria-hidden="true"
								/>
								<span className={styles.moveName}>
									Portfolio
								</span>
							</TransitionLink>
						</div>

						<div className={styles.cardFooter}>
							<div className={styles.footerButtons}>
								<a
									className={styles.footerButton}
									href="https://github.com/SouichiroTsujimoto"
									target="_blank"
									rel="noreferrer"
									aria-label="GitHub"
								>
									<svg
										className={styles.footerButtonIcon}
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											fill="currentColor"
											d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.48 0-.24-.01-.87-.02-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.06 1.03-2.79-.1-.26-.45-1.33.1-2.77 0 0 .85-.28 2.78 1.06A9.4 9.4 0 0 1 12 7.1a9.4 9.4 0 0 1 2.53.35c1.93-1.34 2.78-1.06 2.78-1.06.55 1.44.2 2.51.1 2.77.64.73 1.03 1.66 1.03 2.79 0 3.98-2.34 4.86-4.57 5.11.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .26.18.58.69.48A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
										/>
									</svg>
								</a>
								<a
									className={styles.footerButton}
									href="https://x.com/wuhu1sland"
									target="_blank"
									rel="noreferrer"
									aria-label="X"
								>
									<svg
										className={styles.footerButtonIcon}
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											fill="currentColor"
											d="M18.9 2H22l-6.77 7.73L23 22h-6.46l-5.07-7.05L5.25 22H2l7.25-8.27L1 2h6.63l4.6 6.35L18.9 2Zm-1.13 18.06h1.8L7.17 3.84H5.22l12.55 16.22Z"
										/>
									</svg>
								</a>
								<button
									type="button"
									className={styles.footerButton}
									aria-expanded={showQr}
									aria-controls={qrPanelId}
									onClick={() => setShowQr((prev) => !prev)}
									aria-label="QR code"
								>
									<svg
										className={styles.footerButtonIcon}
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											fill="currentColor"
											d="M3 3h8v8H3V3Zm2 2v4h4V5H5Zm8-2h8v8h-8V3Zm2 2v4h4V5h-4ZM3 13h8v8H3v-8Zm2 2v4h4v-4H5Zm10 0h2v2h-2v-2Zm2 2h2v2h-2v-2Zm-2 2h2v2h-2v-2Zm2 2h4v2h-4v-2Zm2-6h2v4h-2v-4Z"
										/>
									</svg>
								</button>
							</div>
							<div
								id={qrPanelId}
								className={`${styles.qrPanel} ${showQr ? styles.qrPanelOpen : ""}`}
							>
								<div className={styles.qrFrame}>
									<Image
										src="/qr-wuhu1sland.png"
										alt="wuhu1s.land QR code"
										width={140}
										height={140}
									/>
								</div>
								<span className={styles.qrCaption}>
									wuhu1s.land
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
