import { FolderDown, X } from "lucide-react";
import { type SyntheticEvent } from "react";
import Image from "next/image";
import { PicturesFilePlaceholder } from "@/components/modules/add-offer/Form/ImagesForm/PicturesInput/PicturesFilePlaceholder/PicturesFilePlaceholder";
import { PicturesAdd } from "@/components/modules/add-offer/Form/ImagesForm/PicturesInput/PicturesAdd/PicturesAdd";
type PhotosProps = {
	files: File[];
	handleRemoveFile: (e: SyntheticEvent, indexFileToRemove: number) => void;
	isDragActive: boolean;
	handleOnDrop: (index: number) => void;
	handleDragStart: (index: number) => void;
};

export const PicturesFile = ({
	files,
	handleRemoveFile,
	isDragActive,
	handleOnDrop,
	handleDragStart,
}: PhotosProps) => {
	const placeholdersNumber = 5;

	if (!files?.length) {
		return (
			<PicturesFilePlaceholder
				isDragActive={isDragActive}
				placeholdersNumber={placeholdersNumber}
			/>
		);
	}

	return (
		<div className="relative mt-7 rounded-lg border-2 border-dashed   border-gray-300 p-4">
			<div className={`grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4 `}>
				{files.map((file, index) => {
					return (
						<div
							onDragStart={() => handleDragStart(index)}
							onDrop={() => handleOnDrop(index)}
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
							{index === 0 && (
								<div
									className="absolute bottom-0
								w-full rounded-b-lg bg-orange-600 py-2   text-center text-xs text-white"
								>
									zdjęcie główne
								</div>
							)}
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

				{!isDragActive && <PicturesAdd />}
			</div>
		</div>
	);
};
