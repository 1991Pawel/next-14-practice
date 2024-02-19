"use client";
import { X, Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function ItemPage() {
	return (
		<div>
			<h1> DODAJ OKAZJE</h1>
			<h2>
				Podziel się okazją z milionami ludzi Wklej link ze znalezioną okazją lub informacjami o niej
			</h2>

			<div className="mt-8 flex gap-5">
				<div className="relative flex w-full  items-center ">
					<Link className="absolute left-[12px] opacity-[0.5]" size={18} />
					<Input className="pl-[42px]" placeholder="https://www.example.com/greatdeal..." />
					<X color="red" className="absolute right-[12px] opacity-[0.5]" size={18} />
				</div>
				<Button>Zacznijmy</Button>
			</div>
		</div>
	);
}
