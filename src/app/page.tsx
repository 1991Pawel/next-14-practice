import Link from "next/link";
import { ArrowDownToLineIcon, CheckCircle, Leaf } from "lucide-react";
import { MaxWithWrapper } from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";

const perks = [
	{
		name: "instant delivery",
		Icon: ArrowDownToLineIcon,
		description: "rem ipsum dolor sit amet consectetur a",
	},
	{
		name: "sormy loeadsa",
		Icon: CheckCircle,
		description: "rem ipsum dolor sit amet consectetur a",
	},
	{
		name: "loeadsa sormy",
		Icon: Leaf,
		description: "re amet consectetur a m ipsum dolor sit m ipsum dolor sit",
	},
];
export default function Home() {
	return (
		<>
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
						<Button variant="ghost">our quality is good &rarr;</Button>
					</div>
				</div>
			</MaxWithWrapper>
			<section className="border-t border-gray-200 bg-gray-50">
				<MaxWithWrapper className="py-20">
					<div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
						{perks.map((perk) => (
							<div
								key={perk.name}
								className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
							>
								<div className="flex justify-center md:flex-shrink-0">
									<div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-900">
										{<perk.Icon className="h-1/3 w-1/3" />}
									</div>
								</div>
								<div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
									<h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
									<p className="mt-3 text-sm text-muted-foreground">{perk.description}</p>
								</div>
							</div>
						))}
					</div>
				</MaxWithWrapper>
			</section>
		</>
	);
}
