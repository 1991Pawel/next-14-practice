"use client";
import React, { type SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useDropzone, type Accept } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { X, FolderDown } from "lucide-react";
import Image from "next/image";

import { useOfferFormContext } from "@/context/OfferFormContext";
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

type PhotosProps = {
	files: File[];
	handleRemoveFile: (e: SyntheticEvent, indexFileToRemove: number) => void;
	isDragActive: boolean;
};

const Photos = ({
	files,
	handleRemoveFile,
	isDragActive,
	handleDragOver,
	handleDragStart,
	handleDragEnd,
}: PhotosProps) => {
	const placeholdersNumber = 5;

	if (!files?.length) {
		return (
			<div className="relative mt-7 rounded-lg border-2 border-dashed   border-gray-300 p-4">
				<div
					className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center ${isDragActive ? "opacity-0" : ""}`}
				>
					<Button className="" type="button">
						Dodaj obrazki
					</Button>
					<p className="mt-2 text-center text-sm">
						lub przeciągnij i upusć (Maksymany rozmiar pliku to 6 MB. Maksymany wymiar obrazka to
						6000 px, a minimalny to 150 px)
					</p>
				</div>
				<div
					className={`grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4 ${isDragActive ? "opacity-0" : ""}`}
				>
					{Array(placeholdersNumber)
						.fill(null)
						.map((_, i) => (
							<div key={i} className="h-32 rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56"></div>
						))}
				</div>
				<div
					className={`column absolute  left-1/2  top-1/2 flex w-[80%] -translate-x-1/2 -translate-y-1/2 transform flex-col text-center ${isDragActive ? "visible" : "hidden"}`}
				>
					<div className=" ml-auto mr-auto">
						<FolderDown />
					</div>
					Upuść plik tutaj
				</div>
			</div>
		);
	}

	return (
		<div className="relative mt-7 rounded-lg border-2 border-dashed   border-gray-300 p-4">
			<div className={`grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4 `}>
				{files.map((file, index) => {
					return (
						<div
							onDragStart={(e) => handleDragStart(e, index)}
							onDrop={(e) => handleDragOver(e, index)}
							onDragEnd={handleDragEnd}
							className={`relative flex h-32 justify-center  rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56 ${isDragActive ? "opacity-0" : ""}`}
							key={file.name}
						>
							<div
								className="z-index-10 absolute right-[12px] top-0 flex h-[32px] w-[32px] -translate-y-1/2 cursor-pointer items-center justify-center justify-items-center rounded-full bg-red-100"
								onClick={(e) => handleRemoveFile(e, index)}
							>
								<X color="red" size={18} />
							</div>

							<Image
								className="block h-auto w-full object-contain"
								src={URL.createObjectURL(file)}
								alt={file.name}
								width={0}
								height={0}
								style={{
									width: "100%",
									height: "auto",
								}}
							/>
						</div>
					);
				})}
				<div
					className={`column absolute  left-1/2  top-1/2 flex w-[80%] -translate-x-1/2 -translate-y-1/2 transform flex-col text-center ${isDragActive ? "visible" : "hidden"}`}
				>
					<div className=" ml-auto mr-auto">
						<FolderDown />
					</div>
					Upuść plik tutaj
				</div>
				{!isDragActive && <PhotosPlaceholder />}
			</div>
		</div>
	);
};

type FileInputProps = {
	name: string;
	mode: string;
	accept?: Accept | undefined;
	type: string;
};

export const FileInput = (props: FileInputProps) => {
	const { name, mode = "update", accept } = props;
	const { register, unregister, setValue, watch } = useFormContext();
	const { formValues, setFormValues } = useOfferFormContext();
	const [indexDraggedElement, setIndexDraggedElement] = useState(null);
	const canChangeOrder = (formValues?.pictures?.length ?? 0) >= 2;

	const defaultFiles: File[] = formValues?.pictures || [];
	const files: File[] = watch(name, defaultFiles) as File[];

	useEffect(() => {
		setFormValues((prevState) => ({
			...prevState!,
			[name]: files,
		}));
	}, [files, setFormValues]);

	const handleDragStart = (e, index) => {
		console.log(index, "index");
		if (canChangeOrder) {
			setIndexDraggedElement(index);
		}
	};
	const handleDragEnd = () => {
		setIndexDraggedElement(null);
	};

	const handleDragOver = (e, index) => {
		console.log(index);
		console.log({ indexDraggedElement, index });
		if (canChangeOrder && indexDraggedElement !== null) {
			const deepCopy = structuredClone(files);
			console.log(deepCopy, "BEFORE ?UPDATE");

			const temp = deepCopy[indexDraggedElement];

			deepCopy[indexDraggedElement] = deepCopy[index];
			deepCopy[index] = temp;

			console.log(deepCopy, "UPDATE");

			console.log(temp, "TEMP");

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
					{...props}
					className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id={name}
					{...getInputProps()}
				/>

				<Photos
					handleDragStart={handleDragStart}
					handleDragOver={handleDragOver}
					isDragActive={isDragActive}
					handleRemoveFile={handleRemoveFile}
					files={files}
				/>
			</div>
		</div>
	);
};
