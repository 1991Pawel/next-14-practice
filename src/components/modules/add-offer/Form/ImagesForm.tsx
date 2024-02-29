"use client";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FileInput } from "@/components/FileInput/FileInput";

const schema = z.object({
	pictures: z.any().refine((val:[]) => val?.length, "File is required")
  });
type Schema = z.infer<typeof schema>;

export const ImagesForm = ({ handleNextStep }) => {
	// const { formValues, setFormValues } = useFormContext();
	const methods = useForm<Schema>({
		mode: "onBlur",
		resolver: zodResolver(schema),
	});
	const onSubmit = (values: Schema) => {
		console.log("przeszło walidacje", values);
		// setFormValues((prev) => ({
		// 	...prev,
		// 	...data,
		// }));
	};

	const acceptFiles = {
		"image/jpeg": [],
		"image/png": [],
	};

	console.log(methods?.formState?.errors)
	return (
		<section>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<FileInput accept={acceptFiles} name="pictures" mode="append" type="file" />

					{methods?.formState?.errors?.pictures && (
						<div>{methods?.formState?.errors?.pictures?.message}</div>
						)}
						<button> wyślij</button>
				
				</form>
			</FormProvider>
		</section>
	);
};
