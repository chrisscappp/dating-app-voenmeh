import { Sex } from "entity/SelectSex"
import { FormErrorType, ValidateErrorObj } from "./errors"

export interface RegisterForm {
	firstname?: string;
	lastname?: string;
	login?: string;
	email?: string;
	password?: string;
	repeatPassword?: string;
	birthday?: string;
	sex?: Sex;
	checkBoxFlag?: boolean;
}

export interface RegisterSchema {
	formData?: RegisterForm,
	isLoading: boolean;
	error?: FormErrorType;
	validateErrors?: FormErrorType[];
}