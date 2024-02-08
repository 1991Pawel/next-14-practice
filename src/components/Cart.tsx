"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetHeader,
	SheetTitle,
	SheetFooter,
} from "./ui/sheet";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
export const Cart = () => {
	const fee = 1;
	const itemCount = 0;
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

								<span>{formatPrice(fee)}</span>
							</div>
							<div className="flex">
								<span className="flex-1">Total</span>

								<span>{formatPrice(fee)}</span>
							</div>
							<SheetFooter>
								<SheetTrigger asChild>
									<Link
										href="/cart"
										className={buttonVariants({
											className: "w-full",
										})}
									>
										Continue to Checkout
									</Link>
								</SheetTrigger>
							</SheetFooter>
						</div>
					</>
				) : (
					<div className="flex h-full flex-col items-center justify-center space-y-1">
						<div className="relative mb-4 h-60 w-60 text-muted-foreground">
							<Image src="/hippo-empty-cart.png" fill alt="empty shoping cart" />
						</div>
						<div className="text-xl font-semibold">Your cart is empty</div>
						<SheetTrigger asChild>
							<Link
								href="/products"
								className={buttonVariants({
									variant: "link",
									size: "sm",
									className: "tex-sm text-muted-foreground",
								})}
							>
								Add items to your cart to checkout
							</Link>
						</SheetTrigger>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
};
