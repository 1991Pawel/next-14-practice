"use client";
import { useState, useRef, useEffect, type ReactEventHandler } from "react";
import { NavItem } from "@/components/NavItem";
import { PRODUCT_CATEGIES } from "@/config";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export const NavItems = () => {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);
	const isAnyOpen = activeIndex !== null;

	const navRef = useRef<HTMLDivElement | null>(null);

	useOnClickOutside(navRef, () => setActiveIndex(null));

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setActiveIndex(null);
			}
		};

		if (isAnyOpen) {
			window.addEventListener("keydown", handler);
		}
		return () => {
			window.removeEventListener("keydown", handler);
		};
	}, [isAnyOpen]);

	return (
		<div ref={navRef} className="flex h-full gap-4">
			{PRODUCT_CATEGIES.map((category, i) => {
				const handleOpen = () => {
					if (activeIndex === i) {
						setActiveIndex(null);
					} else {
						setActiveIndex(i);
					}
				};
				const isOpen = i === activeIndex;
				return (
					<NavItem
						isAnyOpen={isAnyOpen}
						key={category.value}
						handleOpen={handleOpen}
						category={category}
						isOpen={isOpen}
					/>
				);
			})}
		</div>
	);
};
