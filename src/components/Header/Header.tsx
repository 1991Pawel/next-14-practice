"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export const Header = () => {
	return (
		<header>
			<Button asChild>
				<Link href="/sale">Dodaj okazję</Link>
			</Button>
			<Button onClick={() => console.log("zarejestruj się")}>Zarejestruj się</Button>
		</header>
	);
};
