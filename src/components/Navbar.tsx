import Link from "next/link";
import { MaxWithWrapper } from "@/components/MaxWidthWrapper";
import { Icons } from "@/components/Icons";
import { NavItems } from "@/components/NavItems";
export const Navbar = () => {
	return (
		<div className="sticky inset-x-0 top-0 z-50 h-16 bg-white">
			<header className="relative bg-white">
				<MaxWithWrapper>
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
						</div>
					</div>
				</MaxWithWrapper>
			</header>
		</div>
	);
};
