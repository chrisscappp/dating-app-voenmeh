import { Contacts } from "entity/SelectContacts"
import { FaluctetsItem } from "shared/consts/faluctets"

interface Contact {
	vk: string,
	telegram: string
}

//fixed
export interface Profile {
	firstname?: string;
	lastname?: string;
	birthday?: string;
	sex?: string;
	faculty?: FaluctetsItem | string;
	course?: number;
	confirm?: boolean;
	about?: string;
	interested?: string[];
	hobbies?: string[];
	contacts?: Contact;
	avatar?: string;
}

export interface InfoBlockProps {
	title: string;
	areaPlaceholder: string;
	data?: string | string[]
	readonly?: boolean;
}