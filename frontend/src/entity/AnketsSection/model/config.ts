export enum SectionType {
	FRIENDS = "friends",
	BOYS = "boys",
	GIRLS = "girls",
	FOREIGNERS = "foreigners",
	FACULTET_A = "facultet_a",
	FACULTET_E = "facultet_e",
	FACULTET_I = "facultet_i",
	FACULTET_O = "facultet_o",
	FACULTET_R = "facultet_r"
}

export interface SectionKeys {
	type: SectionType,
	title: string,
	colors: {
		light: string;
		dark: string
	}
	gradient: string;
	gradientDark: string;
}

export const sectionsConfig: Record<SectionType, SectionKeys> = {
	[SectionType.FRIENDS]: {
		colors: {
			dark: "#d22e2e",
			light: "#fff1f1"
		},
		title: "Друзья",
		type: SectionType.FRIENDS,
		gradient: "linear-gradient(90deg, rgba(255,241,241,1) 0%, rgba(210,46,46,1) 100%)",
		gradientDark: "linear-gradient(90deg, rgba(66,66,66,1) 0%, rgba(195,15,15,1) 100%)"
	},
	[SectionType.BOYS]: {
		colors: {
			dark: "#2e82d2",
			light: "#f1f7ff"
		},
		title: "Парни",
		type: SectionType.BOYS,
		gradient: "linear-gradient(90deg, rgba(241,247,255,1) 0%, rgba(46,130,210,1) 100%)",
		gradientDark: "linear-gradient(90deg, rgba(29,29,29,1) 0%, rgba(8,77,143,1) 100%)"
	},
	[SectionType.GIRLS]: {
		colors: {
			dark: "#d22e6c",
			light: "#fff1f7"
		},
		title: "Девушки",
		type: SectionType.GIRLS,
		gradient: "linear-gradient(90deg, rgba(255,241,247,1) 0%, rgba(210,46,108,1) 100%)",
		gradientDark: "linear-gradient(90deg, rgba(31,28,28,1) 0%, rgba(210,46,108,1) 100%)"
	},
	[SectionType.FOREIGNERS]: {
		colors: {
			dark: "#822ed2",
			light: "#f8f1ff"
		},
		title: "Иностранцы",
		type: SectionType.FOREIGNERS,
		gradient: "linear-gradient(90deg, rgba(248,241,255,1) 0%, rgba(130,46,210,1) 100%)",
		gradientDark: "linear-gradient(90deg, rgba(31,28,28,1) 0%, rgba(130,46,210,1) 100%)"
	},
	[SectionType.FACULTET_A]: {
		colors: {
			dark: "#d22e2e",
			light: "#fff1f1"
		},
		title: "Факультет \"А\"",
		type: SectionType.FACULTET_A,
		gradient: "linear-gradient(90deg, rgba(255,241,241,1) 0%, rgba(210,46,46,1) 100%)",
		gradientDark: "linear-gradient(90deg, rgba(66,66,66,1) 0%, rgba(195,15,15,1) 100%)"
	},
	[SectionType.FACULTET_E]: {
		colors: {
			dark: "#d2a82e",
			light: "#fffbf1"
		},
		title: "Факультет \"Е\"",
		type: SectionType.FACULTET_E,
		gradient: "linear-gradient(90deg, rgba(255,251,241,1) 0%, rgba(210,168,46,1) 100%)",
		gradientDark: "linear-gradient(90deg, rgba(31,28,28,1) 0%, rgba(177,139,30,1) 100%)"
	},
	[SectionType.FACULTET_I]: {
		colors: {
			dark: "#f1fff8",
			light: "#2ed287"
		},
		title: "Факультет \"И\"",
		type: SectionType.FACULTET_I,
		gradient: "linear-gradient(90deg, rgba(241,255,248,1) 0%, rgba(46,210,135,1) 100%)",
		gradientDark: "linear-gradient(90deg, rgba(62,64,62,1) 0%, rgba(5,171,88,1) 100%)"
	},
	[SectionType.FACULTET_O]: {
		colors: {
			dark: "#822ed2",
			light: "#f8f1ff"
		},
		title: "Факультет \"О\"",
		type: SectionType.FACULTET_O,
		gradient: "linear-gradient(90deg, rgba(248,241,255,1) 0%, rgba(130,46,210,1) 100%)",
		gradientDark: "linear-gradient(90deg, rgba(31,28,28,1) 0%, rgba(130,46,210,1) 100%)"
	},
	[SectionType.FACULTET_R]: {
		colors: {
			dark: "#2e82d2",
			light: "#f1f7ff"
		},
		title: "Факультет \"Р\"",
		type: SectionType.FACULTET_R,
		gradient: "linear-gradient(90deg, rgba(241,247,255,1) 0%, rgba(46,130,210,1) 100%)",
		gradientDark: "linear-gradient(90deg, rgba(29,29,29,1) 0%, rgba(8,82,153,1) 100%)"
	},
}