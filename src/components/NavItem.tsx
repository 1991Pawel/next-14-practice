"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type PRODUCT_CATEGIES } from "@/config";
import { cn } from "@/lib/utils";
type Category = (typeof PRODUCT_CATEGIES)[number];

type NavItemProps = {
	category: Category;
	handleOpen: () => void;
	isOpen: boolean;
	isAnyOpen: boolean;
};

export const NavItem = ({ isAnyOpen, category, handleOpen, isOpen }: NavItemProps) => {
	return (
		<div className="flex">
			<div className="relative flex items-center">
				<Button variant={isOpen ? "secondary" : "ghost"} onClick={handleOpen} className="gap-1.5">
					{category.label}
					<ChevronDown
						className={cn("h4 w-4 text-muted-foreground transition-all", {
							"-rotate-180": isOpen,
						})}
					/>
				</Button>
			</div>
			{isOpen ? (
				<div
					className={cn("absolute inset-x-0 top-full text-sm text-muted-foreground", {
						"slide-in-form-top-5 animate-in fade-in-10": !isAnyOpen,
					})}
				>
					<div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
					<div className="relative bg-white">
						<div className="mx-auto max-w-7xl px-8">
							<div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
								<div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
									{category.featured.map((item) => (
										<div className="group relative text-base sm:text-sm" key={item.name}>
											<div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
												<Image
													className="object-cover object-center"
													alt="product category image"
													src={item.imageSrc}
													fill
												/>
											</div>
											<Link href={item.href} className="mt-6 block font-medium text-gray-900">
												{item.name}
											</Link>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};
