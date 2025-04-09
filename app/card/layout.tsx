"use client";

import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
