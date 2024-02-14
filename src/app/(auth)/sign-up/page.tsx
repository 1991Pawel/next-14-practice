"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
const Page = () => {
	return (
		<>
			<div className="iems-center container relative flex flex-col justify-center pt-20 lg:px-0">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="text center flex flex-col items-center space-y-2">
						<Icons.logo className="w20 h-20" />
						<h1 className="text-2xl font-bold">Create account</h1>
						<Link
							className={buttonVariants({
								variant: "link",
								className: "text-blue-400",
							})}
							href="/sign-in"
						>
							Already have an account? Sign-in
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>
					<div className="grid gap-6">
						<form onSubmit={() => console.log("action")}>
							<div className="grid gap-2">
								<div className="grid gap-1 py-2">
									<Label htmlFor="email">Email</Label>
									<Input
										placeholder="you@example.com"
										className={cn({
											"focus-visible:ring-red-500": true,
										})}
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<div className="grid gap-1 py-2">
									<Label htmlFor="password">Password</Label>
									<Input
										type="password"
										placeholder="Password"
										className={cn({
											"focus-visible:ring-red-500": true,
										})}
									/>
								</div>
								<Button>Sign up</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
