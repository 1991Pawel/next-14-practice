"use client";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

import { FileInput } from "@/components/FileInput/FileInput";
export const ImagesForm = ({ handleNextStep }: { handleNextStep: () => void }) => {
	const methods = useForm({
		mode: "onBlur",
	});
	const onSubmit = methods.handleSubmit((values) => {
		console.log("values", values);
		// Implement your own form submission logic here.
	});
	// function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
	// 	const target = e.target as HTMLInputElement & {
	// 		files: FileList;
	// 	};
	// 	console.log(target.files);
	// }

	return (
		<section>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<FileInput
						accept="image/png, image/jpg, image/jpeg"
						multiple
						name="pictures"
						mode="append"
					/>
					<button> wyślij</button>
				</form>
			</FormProvider>

			{/* <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
				{({ getRootProps, getInputProps }) => (
					<section>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<p>Drag 'n' drop some files here, or click to select files</p>
						</div>
					</section>
				)}
			</Dropzone> */}
		</section>
	);
};
