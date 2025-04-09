"use client";

import { useEffect, useRef, useState } from "react";
import "./styles.css";
import Iridescence from "./Iridescence";

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Iridescence
				color={[1, 1, 1]}
				mouseReact={false}
				amplitude={0.1}
				speed={1.0}
			/>
			{children}
		</>
	);
}
