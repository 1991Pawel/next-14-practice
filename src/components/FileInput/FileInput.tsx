"use client";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PhotosPlaceholder = () => {
	return (
		<div className="relative h-32 rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56">
			<div className="column absolute  left-1/2 top-1/2 flex w-[80%] -translate-x-1/2 -translate-y-1/2 transform flex-col">
				<Button type="button">Dodaj obrazki</Button>
				<p className="mt-2 text-center text-sm">dodaj lub przeciagnij obrazki</p>
			</div>
		</div>
	);
};

const Photos = ({ files, handleRemoveFile }) => {
	console.log(files, "files");
	const placeholderBox = () => {};
	if (!files?.length) {
		return (
			<div className="relative mt-7 rounded-lg border-2 border-dashed   border-gray-300 p-4">
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
					<Button className="" type="button">
						Dodaj obrazki
					</Button>
					<p className="mt-2 text-center text-sm">
						lub preciagnij i upusé (Maksymany rozmiar pliku to 6 MB. Maksymany wymiar obrazka to
						6000 px, a minimalny to 150 px)
					</p>
				</div>
				<div className="grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4">
					<div className="h-32 rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56"></div>
					<div className="h-32 rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56"></div>
					<div className="h-32 rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56"></div>
					<div className="h-32 rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56"></div>
					<div className="h-32 rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56"></div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="relative mt-7 rounded-lg border-2 border-dashed   border-gray-300 p-4">
				<div className="grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4">
					{files.map((file, index) => {
						return (
							<div
								className="relative flex h-32 justify-center  rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56 "
								key={file.name}
							>
								<div
									className="z-index-10 absolute right-[12px] top-0 flex h-[32px] w-[32px] -translate-y-1/2 cursor-pointer items-center justify-center justify-items-center rounded-full bg-red-100"
									onClick={(e) => handleRemoveFile(e, index)}
								>
									<X color="red" size={18} />
								</div>
								<img
									className="block h-auto w-full object-contain"
									src={URL.createObjectURL(file)}
									alt={file.name}
								/>
							</div>
						);
					})}
					<PhotosPlaceholder />
				</div>
			</div>
		);
	}
};

export const FileInput = (props) => {
	const { name, label = name, mode = "update" } = props;

	const { register, unregister, setValue, watch } = useFormContext();

	const files = watch(name);

	const onDrop = useCallback(
		(droppedFiles) => {
			let newFiles = [];

			if (mode === "update") {
				newFiles = droppedFiles;
			} else if (mode === "append") {
				newFiles = droppedFiles.reduce(
					(accumulator, file) => {
						const isFileAlreadyAdded = accumulator.some((existingFile) =>
							Object.entries(existingFile).every(([key, value]) => file[key] === value),
						);

						if (!isFileAlreadyAdded) {
							accumulator.push(file);
						}

						return accumulator;
					},
					[...(files || [])],
				);
			}

			setValue(name, newFiles, { shouldValidate: true });
		},
		[setValue, name, mode, files],
	);

	const handleRemoveFile = (e, indexFileToRemove) => {
		e.stopPropagation();
		const updatedFiles = files.filter((_, i) => i !== indexFileToRemove);
		setValue(name, updatedFiles, { shouldValidate: false });
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: props.accept,
	});

	useEffect(() => {
		register(name);
		return () => {
			unregister(name);
		};
	}, [register, unregister, name]);

	return (
		<div>
			<div {...getRootProps()}>
				<input
					{...props}
					className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id={name}
					{...getInputProps()}
				/>

				<Photos handleRemoveFile={handleRemoveFile} files={files} />
			</div>
		</div>
	);
};
