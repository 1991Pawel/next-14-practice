"use client";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PicturesInput } from "@/components/modules/add-offer/Form/ImagesForm/PicturesInput/PicturesInput";
import { Button } from "@/components/ui/button";
const schema = z.object({
	pictures: z.custom<FileList>().refine((val) => val?.length, "Zdjecia są wymagane!"),
});
type Schema = z.infer<typeof schema>;

type ImagesFormProps = {
	handlePrevStep: () => void;
	handleNextStep: () => void;
};

export const ImagesForm = ({ handleNextStep, handlePrevStep }: ImagesFormProps) => {
	// const { formValues, setFormValues } = useFormContext();
	const methods = useForm<Schema>({
		mode: "onBlur",
		resolver: zodResolver(schema),
	});
	const onSubmit = (values: Schema) => {
		console.log(values);
		handleNextStep();
	};

	const acceptFiles = {
		"image/jpeg": [],
		"image/png": [],
	};

	// console.log(methods?.formState?.errors);
	return (
		<section>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<PicturesInput accept={acceptFiles} name="pictures" mode="append" type="file" />

					{methods?.formState?.errors?.pictures && (
						<div>{methods?.formState?.errors?.pictures?.message}</div>
					)}
				</form>
				<Button onClick={handlePrevStep}>cofnij</Button>
				<Button onClick={handleNextStep}>Dalej</Button>
			</FormProvider>
		</section>
	);
};
