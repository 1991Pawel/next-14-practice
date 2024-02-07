"use client";
import { ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "./ui/sheet";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
export const Cart = () => {
	const itemCount = 1;
	return (
		<Sheet>
			<SheetTrigger className="group -mx-2 flex items-center p-2">
				<ShoppingCart className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"></ShoppingCart>
				<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
			</SheetTrigger>
			<SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
				<SheetHeader className="space-y-2.5 pr-6">
					<SheetTitle>Cart (0)</SheetTitle>
				</SheetHeader>
				{itemCount > 0 ? (
					<>
						<div className="flex w-full flex-col pr-6">Cart Items</div>
						<div className="space-y4 pr6"></div>
						<Separator />
						<div className="space-y-1.5 pr-6">
							<div className="flex">
								<span className="flex-1">Shipping</span>
								<span>Free</span>
							</div>
							<div className="flex">
								<span className="flex-1">Transaction Free</span>
								{/* <span>{formatPrice(1)}</span> */}
								<span>{formatPrice(1)}</span>
							</div>
						</div>
					</>
				) : (
					<div></div>
				)}
			</SheetContent>
		</Sheet>
	);
};
