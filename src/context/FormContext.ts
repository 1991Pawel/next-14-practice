import { createContext, useContext } from "react";

export const FormContext = createContext<any | undefined>(undefined);

export const useFormContext = () => {
	const formValues = useContext(FormContext);

	if (formValues === undefined) {
		throw new Error("useFormContext");
	}

	return formValues;
};
