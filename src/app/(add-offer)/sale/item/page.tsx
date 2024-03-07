"use client";
import { OfferFormContextProvider } from "@/context/OfferFormContext";
import { AddOfferForm } from "@/components/modules/add-offer/Form/AddOfferForm";



export default function ItemPage() {

	return (
		<OfferFormContextProvider>
			<AddOfferForm/>
		</OfferFormContextProvider>
	);
}
