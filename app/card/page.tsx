"use client";

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

	// カードを中央位置に戻す関数
	const setCardCenter = () => {
		if (!cardWrapperRef.current) return;

		const centerX = 0.5;
		const centerY = 0.5;

		const wrapper = cardWrapperRef.current;
		wrapper.style.setProperty("--ratiox", centerX.toString());
		wrapper.style.setProperty("--ratioy", centerY.toString());
		wrapper.style.setProperty("--mx", `${centerX * 100}%`);
		wrapper.style.setProperty("--my", `${centerY * 100}%`);
		wrapper.style.setProperty("--rx", "0deg");
		wrapper.style.setProperty("--ry", "0deg");
		wrapper.style.setProperty("--posx", "50%");
		wrapper.style.setProperty("--posy", "50%");

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

	// 背景色変更ハンドラー
	const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBgColor(Number(e.target.value));
	};

	return (
		<>
			<div
				className={`card-wrapper ${isReturningToCenter ? "return-to-center" : ""}`}
				ref={cardWrapperRef}
				onMouseMove={updateCardPosition}
				onMouseLeave={handleMouseLeave}
			>
				<img src="./azusa.png" className="card" alt="カード画像" />
				<div className="card color" />
				<div className="card highlight" />
			</div>
		</>
	);
}
