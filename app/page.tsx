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
								<span className={styles.cardHpLabel}>HP</span>
								<span className={styles.cardHpValue}>140</span>
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
								<div
									className={styles.energyDots}
									aria-hidden="true"
								>
									<span className={styles.energyDot} />
									<span className={styles.energyDot} />
								</div>
								<span className={styles.moveName}>
									Portfolio
								</span>
								<span className={styles.movePower}>30</span>
							</TransitionLink>
						</div>

						<div className={styles.cardFooter}>
							<div className={styles.footerButtons}>
								<a
									className={styles.footerButton}
									href="https://github.com/SouichiroTsujimoto"
									target="_blank"
									rel="noreferrer"
								>
									GitHub
								</a>
								<a
									className={styles.footerButton}
									href="https://x.com/wuhu1sland"
									target="_blank"
									rel="noreferrer"
								>
									X
								</a>
								<button
									type="button"
									className={styles.footerButton}
									aria-expanded={showQr}
									aria-controls={qrPanelId}
									onClick={() => setShowQr((prev) => !prev)}
								>
									QR
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
