"use client";
import { X, Link } from "lucide-react";
import { SubmitHandler, useForm, register } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
	href: z
		.string()
		.min(1, { message: "To pole jest wymagane" })
		.url({ message: "Wprowadź poprawny link" }),
});

type Schema = z.infer<typeof schema>;

export default function ItemPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		resetField,
		watch,
	} = useForm<Schema>({
		resolver: zodResolver(schema),
	});
	const onSubmit = (data: Schema) => console.log(data);
	const showButtonToClearLink = watch("href")?.length >= 3;

	return (
		<div>
			<h1> DODAJ OKAZJE</h1>
			<h2>
				Podziel się okazją z milionami ludzi Wklej link ze znalezioną okazją lub informacjami o niej
			</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mt-8 flex gap-5">
					<div className="relative flex w-full  items-center ">
						<Link className="absolute left-[12px] opacity-[0.5]" size={18} />
						<Input
							className="truncate pl-[42px] pr-[42px]"
							placeholder="https://www.example.com/greatdeal..."
							{...register("href")}
						/>
						{showButtonToClearLink && (
							<button
								onClick={() => resetField("href")}
								className="absolute right-[8px] flex h-full  w-[32px] cursor-pointer items-center justify-center opacity-[0.5] "
								type="button"
							>
								<X color="red" size={18} />
							</button>
						)}
					</div>
					<Button>Zacznijmy</Button>
				</div>
				{errors.href?.message && (
					<span className="mt-2 block text-xs text-red-500">{errors.href.message}</span>
				)}
			</form>
		</div>
	);
}
