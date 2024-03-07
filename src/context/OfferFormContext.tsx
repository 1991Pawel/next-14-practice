import React, { createContext, useContext, useState } from "react";

export type FormValues = {
	href: string;
	pictures: File[];
};

export const FormSteps = {
	LINK: "LINK",
	IMAGES: "IMAGES",
	DETAILS: "DETAILS",
};

type OfferFormContextProviderProps = {
	children: React.ReactNode;
};
type CurrentStep = keyof typeof FormSteps;

type FormContextType = {
	formValues: FormValues | undefined;
	setFormValues: React.Dispatch<React.SetStateAction<FormValues | undefined>>;
	currentStep: CurrentStep;
	handleNextStep: () => void;
	handlePrevStep: () => void;
};

export const OfferFormContext = createContext<FormContextType | undefined>(undefined);

export const OfferFormContextProvider = ({ children }: OfferFormContextProviderProps) => {
	const [formValues, setFormValues] = useState<FormValues>();

	const steps = Object.values(FormSteps);
	const [currentStep, setCurrentStep] = useState(steps[0]);
	const currentStepIndex = steps.indexOf(currentStep);
	const firstStep = steps[0];
	const itsFirstStep = firstStep === currentStep;
	const lastStep = steps[steps.length - 1];
	const itsLastStep = currentStep === lastStep;

	const handleNextStep = () => {
		if (!itsLastStep) {
			setCurrentStep(() => steps[currentStepIndex + 1]);
		}
	};
	const handlePrevStep = () => {
		if (!itsFirstStep) {
			setCurrentStep(() => steps[currentStepIndex - 1]);
		}
	};

	const contextValue: FormContextType = {
		formValues,
		setFormValues,
		currentStep: currentStep as CurrentStep,
		handleNextStep,
		handlePrevStep,
	};

	return <OfferFormContext.Provider value={contextValue}>{children}</OfferFormContext.Provider>;
};

export function useOfferFormContext() {
	const ctx = useContext(OfferFormContext);
	if (ctx === undefined) {
		throw new Error("useuseOfferFormContext must be used within a ContextProvider");
	}
	return ctx;
}
