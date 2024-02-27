"use client";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileInput } from "@/components/FileInput/FileInput";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const schema = z.object({
	pictures: z.array(z.any()).refine(
		(files: File[]) => {
			// Sprawdź, czy przynajmniej jeden plik został przesłany
			if (!files || files.length === 0) return false;

			const allImages = files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type));

			const allUnderSizeLimit = files.every((file: File) => file?.size <= MAX_FILE_SIZE);

			return allImages && allUnderSizeLimit;
		},
		{
			message: `At least one image is required. Only .jpg, .jpeg, .png, and .webp files are accepted. Max file size is 5MB.`,
		},
	),
});

type Schema = z.infer<typeof schema>;

export const ImagesForm = () => {
	const methods = useForm<Schema>({
		mode: "onBlur",
		resolver: zodResolver(schema),
	});
	const onSubmit = (values: Schema) => {
		console.log("values", values);
	};

	return (
		<section>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<FileInput
						accept="image/png, image/jpg, image/jpeg"
						name="pictures"
						mode="append"
						type="file"
					/>

					<button> wyślij</button>
					{methods?.formState?.errors?.pictures && (
						<div>{methods?.formState?.errors?.pictures?.message}</div>
					)}
				</form>
			</FormProvider>
		</section>
	);
};
