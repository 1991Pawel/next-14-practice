import { FolderDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type PicturesFilePlaceholderProps = {
	placeholdersNumber: number;
	isDragActive: boolean;
};

export const PicturesFilePlaceholder = ({
	placeholdersNumber,
	isDragActive,
}: PicturesFilePlaceholderProps) => {
	return (
		<div className="relative mt-7 rounded-lg border-2 border-dashed   border-gray-300 p-4">
			<div
				className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center ${isDragActive ? "opacity-0" : ""}`}
			>
				<Button className="" type="button">
					Dodaj obrazki
				</Button>
				<p className="mt-2 text-center text-sm">
					lub przeciągnij i upusć (Maksymany rozmiar pliku to 6 MB. Maksymany wymiar obrazka to 6000
					px, a minimalny to 150 px)
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
};
