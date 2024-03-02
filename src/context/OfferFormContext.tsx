import React, { createContext, useContext, useState } from "react";

export type FormValues = {
	href: string;
	pictures: File[] | [];
};

type FormContextType = {
	formValues: FormValues | undefined;
	setFormValues: React.Dispatch<React.SetStateAction<FormValues | undefined>>;
};

type OfferFormContextProviderProps = {
	children: React.ReactNode;
};

export const OfferFormContext = createContext<FormContextType | undefined>(undefined);

export const OfferFormContextProvider = ({ children }: OfferFormContextProviderProps) => {
	const [formValues, setFormValues] = useState<FormValues>();
	// console.log(formValues, "FormValues");

	return (
		<OfferFormContext.Provider value={{ formValues, setFormValues }}>
			{children}
		</OfferFormContext.Provider>
	);
};

export function useOfferFormContext() {
	const ctx = useContext(OfferFormContext);
	if (ctx === undefined) {
		throw new Error("useuseOfferFormContext must be used within a ContextProvider");
	}
	return ctx;
}
