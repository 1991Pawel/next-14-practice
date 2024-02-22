"use client";
import { X, Link } from "lucide-react";
import { useForm } from "react-hook-form";
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

export const ImagesForm = ({ handleNextStep }: { handleNextStep: () => void }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		resetField,
		watch,
	} = useForm<Schema>({
		resolver: zodResolver(schema),
	});
	const hrefIsFilled = watch("href")?.length >= 3;
	const onSubmit = (data: Schema) => {
		alert("wszystko git");
		console.log(data);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>Wyróżnij swoją okazję dzięki zdjęciom</h2>
			Przeciągnij i upuść, aby dodać do 8 obrazków. Możesz zmieniać ich kolejność oraz wybrać
			zdjęcie główne.
		</form>
	);
};
