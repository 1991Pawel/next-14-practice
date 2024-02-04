"use client";
import { useState } from "react";
import { NavItem } from "@/components/NavItem";
import { PRODUCT_CATEGIES } from "@/config";

export const NavItems = () => {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);
	const isAnyOpen = activeIndex !== null;
	return (
		<div className="flex h-full gap-4">
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
