import Link from "next/link";
import { MaxWithWrapper } from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
export default function Home() {
	return (
		<MaxWithWrapper>
			<div className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
					Welcome Lorem ipsum dolor sit amet.{" "}
					<span className="text-blue-600">Lorem ipsum dolor sit amet.</span>
				</h1>
				<p className="mt-6 max-w-prose text-lg text-muted-foreground">
					{" "}
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus veritatis et dolore rem,
					facilis deserunt!{" "}
				</p>
				<div className="mt-6 flex flex-col gap-4 sm:flex-row">
					<Link className={buttonVariants()} href="/prodcuts">
						go to products
					</Link>
				</div>
			</div>
		</MaxWithWrapper>
	);
}
