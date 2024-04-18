import { Contacts } from "entity/SelectContacts"
import { FaluctetsItem } from "shared/consts/faluctets"

export interface Contact {
	vk?: string,
	telegram?: string,
	phone?: string
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
	data?: string | string[] | Contact
	readonly?: boolean;
}