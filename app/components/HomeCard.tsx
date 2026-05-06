"use client";

import { TransitionLink } from "@/app/components/TransitionLink";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "../home.module.css";

const MAX_TILT = 15;
const RETURN_DURATION = 800;

type TiltState = {
	rx: number;
	ry: number;
	mx: number;
	my: number;
};

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export default function HomeCard() {
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const stateRef = useRef<TiltState>({ rx: 0, ry: 0, mx: 50, my: 50 });
	const rafIdRef = useRef<number | null>(null);
	const [showQr, setShowQr] = useState(false);
	const qrPanelId = useId();

	const writeVars = useCallback((s: TiltState) => {
		const el = wrapperRef.current;
		if (!el) return;
		el.style.setProperty("--rx", `${s.rx}deg`);
		el.style.setProperty("--ry", `${s.ry}deg`);
		el.style.setProperty("--mx", `${s.mx}%`);
		el.style.setProperty("--my", `${s.my}%`);
	}, []);

	const animateToCenter = useCallback(() => {
		const el = wrapperRef.current;
		if (!el) return;
		el.classList.add(styles.cardWrapperReturning);
		const start = performance.now();
		const from = { ...stateRef.current };

		const tick = (now: number) => {
			const progress = Math.min((now - start) / RETURN_DURATION, 1);
			const e = easeOutCubic(progress);
			const next: TiltState = {
				rx: from.rx * (1 - e),
				ry: from.ry * (1 - e),
				mx: from.mx + (50 - from.mx) * e,
				my: from.my + (50 - from.my) * e,
			};
			stateRef.current = next;
			writeVars(next);
			if (progress < 1) {
				rafIdRef.current = requestAnimationFrame(tick);
			} else {
				rafIdRef.current = null;
				el.classList.remove(styles.cardWrapperReturning);
			}
		};

		if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
		rafIdRef.current = requestAnimationFrame(tick);
	}, [writeVars]);

	useEffect(() => {
		writeVars(stateRef.current);
		return () => {
			if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
		};
	}, [writeVars]);

	const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
		const el = wrapperRef.current;
		if (!el) return;
		if (rafIdRef.current) {
			cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = null;
		}
		el.classList.remove(styles.cardWrapperReturning);
		const rect = el.getBoundingClientRect();
		const ratioX =
			(event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
		const ratioY =
			(event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
		const next: TiltState = {
			rx: -ratioY * MAX_TILT,
			ry: ratioX * MAX_TILT,
			mx: 50 + ratioX * 50,
			my: 50 + ratioY * 50,
		};
		stateRef.current = next;
		writeVars(next);
	};

	const handlePointerLeave = () => {
		animateToCenter();
	};

	return (
		<div
			className={styles.cardWrapper}
			ref={wrapperRef}
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
		>
			<div className={styles.card}>
				<div className={styles.cardInner}>
					<div className={styles.cardHeader}>
						<span className={styles.cardStage}>Profile</span>
					</div>

					<div className={styles.cardTitleRow}>
						<h1 className={styles.cardName}>Tsujimoto Souichiro</h1>
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
								src="/icon-a.webp"
								alt="icon"
								width={800}
								height={1156}
								priority
								sizes="(min-width: 960px) 420px, (min-width: 481px) 400px, 360px"
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
							<span className={styles.moveName}>Portfolio</span>
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
									src="/qr-wuhu1sland.webp"
									alt="wuhu1s.land QR code"
									width={280}
									height={280}
									sizes="140px"
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
	);
}
