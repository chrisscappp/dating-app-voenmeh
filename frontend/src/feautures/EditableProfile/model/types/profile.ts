import { Sex } from "entity/SelectSex"
import { SelectInterestedItem } from "entity/SelectInterested"
import { BaseHobbies } from "entity/SelectHobbies"
import { Contacts } from "entity/SelectContacts"
import { FaluctetsItem } from "shared/consts/faluctets"
import { Profile } from "entity/ProfileCard"

interface Contact {
	vk?: string,
	telegram?: string
}

export interface EditableProfileSchema {
	data?: Profile;
	form?: Profile;
	error?: string;
	isLoading: boolean;
	readonly: boolean;
	validateErrors?: string[];
}