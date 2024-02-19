"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VoucherPage() {
	return (
		<div>
			<Button asChild>
				<Link href="/sale/item">Okazja</Link>
			</Button>
			<Button asChild>
				<Link href="/sale/voucher">Kupon</Link>
			</Button>
		</div>
	);
}
