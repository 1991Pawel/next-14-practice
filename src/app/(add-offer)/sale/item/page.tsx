"use client";

import React, { useState } from "react";
import { LinkForm } from "@/components/modules/add-offer/Form/LinkForm/LinkForm";
import { DetailsForm } from "@/components/modules/add-offer/Form/DetailsForm/DetailsForm";
import { ImagesForm } from "@/components/modules/add-offer/Form/ImagesForm/ImagesForm";
import { OfferFormContextProvider } from "@/context/OfferFormContext";

export const FormSteps = {
	LINK: "LINK",
	IMAGES: "IMAGES",
	DETAILS: "DETAILS",
};

export default function ItemPage() {
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

	return (
		<OfferFormContextProvider>
			{currentStep === FormSteps.LINK && <LinkForm handleNextStep={handleNextStep} />}
			{currentStep === FormSteps.IMAGES && (
				<ImagesForm handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />
			)}
			{currentStep === FormSteps.DETAILS && <DetailsForm handlePrevStep={handlePrevStep} />}
		</OfferFormContextProvider>
	);
}
