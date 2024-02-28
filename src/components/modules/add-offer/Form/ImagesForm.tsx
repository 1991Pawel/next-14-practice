"use client";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext } from "@/context/FormContext";
import { FileInput } from "@/components/FileInput/FileInput";
// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const schema = z.object({
	pictures: z.array(z.any()).refine(
		(files: File[]) => {
			console.log(files);
			// Sprawdź, czy przynajmniej jeden plik został przesłany
			return files && files.length > 0;
		},
		{
			message: `Zdjęcie jest wymagane`,
		},
	),
});

type Schema = z.infer<typeof schema>;

export const ImagesForm = ({ handleNextStep }) => {
	// const { formValues, setFormValues } = useFormContext();
	const methods = useForm<Schema>({
		mode: "onBlur",
		resolver: zodResolver(schema),
	});
	const onSubmit = (values: Schema) => {
		console.log("values", values);
		// setFormValues((prev) => ({
		// 	...prev,
		// 	...data,
		// }));
	};

	const acceptFiles = {
		"image/jpeg": [],
		"image/png": [],
	};

	return (
		<section>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<FileInput accept={acceptFiles} name="pictures" mode="append" type="file" />

					<button> wyślij</button>
					{methods?.formState?.errors?.pictures && (
						<div>{methods?.formState?.errors?.pictures?.message}</div>
					)}
				</form>
			</FormProvider>
		</section>
	);
};
