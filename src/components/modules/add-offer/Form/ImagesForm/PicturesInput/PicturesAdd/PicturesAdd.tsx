import { Button } from "@/components/ui/button";
export const PicturesAdd = () => {
	return (
		<div className="relative h-32 rounded-lg bg-gray-100 sm:h-40 md:h-48 lg:h-56">
			<div className="column absolute  left-1/2 top-1/2 flex w-[80%] -translate-x-1/2 -translate-y-1/2 transform flex-col">
				<Button type="button">Dodaj obrazki</Button>
				<p className="mt-2 text-center text-sm">dodaj lub przeciagnij obrazki</p>
			</div>
		</div>
	);
};
