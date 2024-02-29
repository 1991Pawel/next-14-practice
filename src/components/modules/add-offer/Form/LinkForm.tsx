"use client";
import { X, Link } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOfferFormContext } from "@/context/OfferFormContext";

const schema = z.object({
	href: z
		.string()
		.min(1, { message: "To pole jest wymagane" })
		.url({ message: "Wprowadź poprawny link" }),
});

export type Schema = z.infer<typeof schema>;

type LinkFormProps = {
	handleNextStep: () => void;
};

export const LinkForm = ({ handleNextStep }: LinkFormProps) => {
	const { formValues, setFormValues } = useOfferFormContext();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: {
			href: formValues?.href,
		},
	});
	const hrefIsFilled = watch("href")?.length >= 3;
	const onSubmit = (data: Schema) => {
		setFormValues((prev) => ({
			//ts
			...prev!,
			...data,
		}));
		handleNextStep();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mt-8 flex gap-5">
				<div className="relative flex w-full  items-center ">
					<Link className="absolute left-[12px] opacity-[0.5]" size={18} />
					<Input
						className="truncate pl-[42px] pr-[42px]"
						placeholder="https://www.example.com/greatdeal..."
						{...register("href")}
					/>
					{hrefIsFilled && (
						<button
							onClick={() => {
								setValue("href", "");
							}}
							className="absolute right-[8px] flex h-full  w-[32px] cursor-pointer items-center justify-center opacity-[0.5] "
							type="button"
						>
							<X color="red" size={18} />
						</button>
					)}
				</div>
				<Button onClick={() => "buum"} disabled={!hrefIsFilled}>
					Zacznijmy
				</Button>
			</div>
			{errors.href?.message && (
				<span className="mt-2 block text-xs text-red-500">{errors.href.message}</span>
			)}
		</form>
	);
};
