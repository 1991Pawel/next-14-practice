import Link from "next/link";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Icons } from "@/components/Icons";
import { NavItems } from "@/components/NavItems";
import { buttonVariants } from "@/components/ui/button";
import { Cart } from "@/components/Cart";
export const Navbar = () => {
	const user = null;
	return (
		<div className="sticky inset-x-0 top-0 z-50 h-16 bg-white">
			<header className="relative bg-white">
				<MaxWidthWrapper>
					<div className="border-b border-gray-200">
						<div className="flex h-16 items-center">
							<div className="ml-4 flex lg:ml-0">
								<Link href="/">
									<Icons.logo className="h-10 w-10" />
								</Link>
							</div>

							<div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
								<NavItems />
							</div>

							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
									{user ? null : (
										<Link
											href="/sign-in"
											className={buttonVariants({
												variant: "ghost",
											})}
										>
											Sign in
										</Link>
									)}

									{user ? null : <span className="h-6 w-px bg-gray-200" aria-hidden="true" />}

									{user ? null : (
										<Link
											href="/sign-up"
											className={buttonVariants({
												variant: "ghost",
											})}
										>
											Create account
										</Link>
									)}

									{user ? <span className="h-6 w-px bg-gray-200" aria-hidden="true" /> : null}

									{user ? null : (
										<div className="flex lg:ml-6">
											<span className="h-6 w-px bg-gray-200" aria-hidden="true" />
										</div>
									)}

									<div className="ml-4 flow-root lg:ml-6">
										<Cart />
									</div>
								</div>
							</div>
						</div>
					</div>
				</MaxWidthWrapper>
			</header>
		</div>
	);
};
