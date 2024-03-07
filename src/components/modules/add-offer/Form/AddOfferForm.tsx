import { LinkForm } from "@/components/modules/add-offer/Form/LinkForm/LinkForm";
import { DetailsForm } from "@/components/modules/add-offer/Form/DetailsForm/DetailsForm";
import { ImagesForm } from "@/components/modules/add-offer/Form/ImagesForm/ImagesForm";
import { useOfferFormContext, FormSteps } from "@/context/OfferFormContext";
export const AddOfferForm = () => {
	const { currentStep, handleNextStep, handlePrevStep } = useOfferFormContext();

	return (
		<>
			{currentStep === FormSteps.LINK && <LinkForm handleNextStep={handleNextStep} />}
			{currentStep === FormSteps.IMAGES && (
				<ImagesForm handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />
			)}
			{currentStep === FormSteps.DETAILS && <DetailsForm handlePrevStep={handlePrevStep} />}
		</>
	);
};
