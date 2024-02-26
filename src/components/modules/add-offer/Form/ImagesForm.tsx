"use client";
import Dropzone from "react-dropzone";
export const ImagesForm = ({ handleNextStep }: { handleNextStep: () => void }) => {
	function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
		const target = e.target as HTMLInputElement & {
			files: FileList;
		};
		console.log(target.files);
	}
	return (
		<section>
			<div className="mt-7 rounded-lg border border-gray-300 p-4">
				<div className="grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4">
					<div className="h-32 rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56"></div>
					<div className="h-32 rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56"></div>
					<div className="h-32 rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56"></div>
					<div className="h-32 rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56"></div>
				</div>
			</div>

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
