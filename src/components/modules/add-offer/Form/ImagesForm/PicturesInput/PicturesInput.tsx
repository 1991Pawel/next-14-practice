"use client";
import React, { type SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useDropzone, type Accept } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { PicturesFile } from "@/components/modules/add-offer/Form/ImagesForm/PicturesInput/PicturesFile/PicturesFile";
import { useOfferFormContext } from "@/context/OfferFormContext";

type FileInputProps = {
	name: string;
	mode: string;
	accept?: Accept | undefined;
	type: string;
};

export const PicturesInput = (props: FileInputProps) => {
	const { name, mode = "update", accept } = props;
	const { register, unregister, setValue, watch } = useFormContext();
	const { formValues, setFormValues } = useOfferFormContext();
	const [indexDraggedElement, setIndexDraggedElement] = useState<null | number>(null);
	const canChangeOrder = (formValues?.pictures?.length ?? 0) >= 2;

	const defaultFiles: File[] = formValues?.pictures || [];
	const files: File[] = watch(name, defaultFiles) as File[];

	useEffect(() => {
		setFormValues((prevState) => ({
			...prevState!,
			[name]: files,
		}));
	}, [files, setFormValues, name]);

	const handleDragStart = (index: number) => {
		if (canChangeOrder) {
			setIndexDraggedElement(index);
		}
	};

	const handleOnDrop = (index: number) => {
		if (canChangeOrder && indexDraggedElement !== null) {
			const deepCopy = structuredClone(files);
			const temp = deepCopy[indexDraggedElement];
			deepCopy[indexDraggedElement] = deepCopy[index];
			deepCopy[index] = temp;

			setValue(name, deepCopy);
		}
	};

	const onDrop = useCallback(
		(droppedFiles: File[]) => {
			let newFiles: File[] = [];

			if (mode === "update") {
				newFiles = droppedFiles;
			} else if (mode === "append") {
				newFiles = droppedFiles.reduce(
					(accumulator, file) => {
						const isFileAlreadyAdded = accumulator.some(
							(existingFile) => existingFile.name === file.name && existingFile.size === file.size,
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

	const handleRemoveFile = (e: SyntheticEvent, indexFileToRemove: number) => {
		e.stopPropagation();

		const updatedFiles = files.filter((_, i) => i !== indexFileToRemove);
		setValue(name, updatedFiles, { shouldValidate: false });
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: accept,
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
					className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id={name}
					{...getInputProps()}
				/>

				<PicturesFile
					handleDragStart={handleDragStart}
					handleOnDrop={handleOnDrop}
					isDragActive={isDragActive}
					handleRemoveFile={handleRemoveFile}
					files={files}
				/>
			</div>
		</div>
	);
};
