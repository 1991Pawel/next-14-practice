"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LinkForm } from "@/components/modules/add-offer/Form/LinkForm";
import { DetailsForm } from "@/components/modules/add-offer/Form/DetailsForm";
import { ImagesForm } from "@/components/modules/add-offer/Form/ImagesForm";
import { OfferFormContextProvider, useOfferFormContext } from "@/context/OfferFormContext";

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
		<div>
			<OfferFormContextProvider>
		
				{currentStep === FormSteps.LINK && <LinkForm handleNextStep={handleNextStep} />}
				{currentStep === FormSteps.DETAILS && <DetailsForm handleNextStep={handleNextStep} />}
				{currentStep === FormSteps.IMAGES && <ImagesForm handleNextStep={handleNextStep} />}
				{!itsFirstStep && <Button onClick={handlePrevStep}>cofnij</Button>}
				{!itsFirstStep && <Button onClick={handleNextStep}>Dalej</Button>}

			</OfferFormContextProvider>
	
		</div>
	);
}
