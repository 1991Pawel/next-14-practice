"use client";
import { X, Link } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const FormSteps = {
	LINK: "LINK",
	KEY_INFO: "KEY_INFO",
	DETAILS: "DETAILS",
};

const schema = z.object({
	href: z
		.string()
		.min(1, { message: "To pole jest wymagane" })
		.url({ message: "Wprowadź poprawny link" }),
});

type Schema = z.infer<typeof schema>;

export default function ItemPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		resetField,
		watch,
	} = useForm<Schema>({
		resolver: zodResolver(schema),
	});
	const steps = Object.values(FormSteps);
	const [currentStep, setCurrentStep] = useState(steps[0]);
	const firstStep = steps[0];
	const itsFirstStep = steps[0] === currentStep;
	const lastStep = currentStep === steps[steps.length - 1];
	const itsLastStep = currentStep === lastStep;
	const hrefIsFilled = watch("href")?.length >= 3;

	const fetchData = (data: Schema) => {
		console.log(data);
		alert("wyslany");
	};

	const onSubmit = (data: Schema) => {
		console.log("current", currentStep);
		console.log("itsLastStep", itsLastStep);
		if (itsLastStep) {
			fetchData(data);
		} else {
			handleNextStep();
		}
	};

	const handleNextStep = () => {
		const currentStepIndex = steps.indexOf(currentStep);
		if (currentStepIndex) {
			setCurrentStep(steps[currentStepIndex + 1]);
		}
	};
	{
		console.log(currentStep, "current");
	}
	return (
		<div>
			<h1> DODAJ OKAZJE</h1>
			<h2>
				Podziel się okazją z milionami ludzi Wklej link ze znalezioną okazją lub informacjami o niej
			</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				{currentStep === FormSteps.LINK && (
					<>
						<div className="mt-8 flex gap-5">
							<div className="relative flex w-full  items-center ">
								<Link className="absolute left-[12px] opacity-[0.5]" size={18} />
								<Input
									className="truncate pl-[42px] pr-[42px]"
									placeholder="https://www.example.com/greatdeal..."
									{...register("href")}
								/>
								{hrefIsFilled && (
									<button
										onClick={() => resetField("href")}
										className="absolute right-[8px] flex h-full  w-[32px] cursor-pointer items-center justify-center opacity-[0.5] "
										type="button"
									>
										<X color="red" size={18} />
									</button>
								)}
							</div>
							<Button onClick={() => "buum"} disabled={!hrefIsFilled}>
								Zacznijmy
							</Button>
						</div>
						{errors.href?.message && (
							<span className="mt-2 block text-xs text-red-500">{errors.href.message}</span>
						)}
					</>
				)}
				{currentStep === FormSteps.KEY_INFO && (
					<>
						<h2>KEY INFO FORM.</h2>
					</>
				)}
				{currentStep === FormSteps.DETAILS && (
					<>
						<h2>DETAILS FORM.</h2>
					</>
				)}
			</form>
			{/* <>{!itsFirstStep && <Button onClick={handleNextStep}>cofnij</Button>}</> */}
			<>{!itsFirstStep && <Button onClick={handleNextStep}>Dalej</Button>}</>
			{/* {showChangeStepsButtons && (
				<>
					<Button>Cofnij</Button>
					<Button>Dalej</Button>
				</>
			)} */}
		</div>
	);
}
