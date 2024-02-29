"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";

const schema = z.object({
	title: z
		.string()
		.min(1, { message: "To pole jest wymagane" })
		.url({ message: "Wprowadź poprawny link" }),

	price: z.z.string().min(1, { message: "To pole jest wymagane" }),
});

type Schema = z.infer<typeof schema>;

export const DetailsForm = ({ handleNextStep }: { handleNextStep: () => void }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Schema>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: Schema) => {
		console.log(data);

		handleNextStep();
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2 className="mt-10 text-center font-medium">Zacznijmy od tego, co najważniejsze</h2>
			<div className="mt-8 flex gap-5">
				<div className="w-full">
					<label className="mb-2 block text-sm font-medium">
						Tytuł
						<span className="ml-1 text-gray-500">(Wymagane)</span>
					</label>
					<Input
						className="truncate "
						placeholder="Krotki tytut opisujacy znaleziona"
						{...register("title")}
					/>
				</div>
			</div>
			<div>
				<h3 className="mb-3 mt-3 text-lg font-medium">Cena</h3>
				<div className="mb-3 mt-3 flex w-full flex-col">
					<label className="mb-2 block text-sm font-medium">Cena</label>
					<Input className="truncate " placeholder="0,00" {...register("price")} />
				</div>
			</div>

			{errors.title?.message && (
				<span className="mt-2 block text-xs text-red-500">{errors.title.message}</span>
			)}
		</form>
	);
};
