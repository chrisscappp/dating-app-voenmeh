export interface InfoBlock {
	imgUrl: string;
	subTitle: string;
	text: string;
	subText: string;
	buttonsText?: Array<string>
}

export enum InfoBlockName {
	RESULT = "resultBlock",
	MISSION = "missionBlock",
	INTERNAZI = "internaziBlock",
	GET_STARTED = "getStartedBlock"
}

export type ConfigType = Record<InfoBlockName, InfoBlock>

export const mainPageInfoConfig: ConfigType = {
	[InfoBlockName.RESULT]: {
		imgUrl: "https://result.school/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fresult.134d7175.png&w=384&q=75",
		subTitle: "Результат приложения",
		text: "Текст результата 1",
		subText: "Текст результата 2"
	},
	[InfoBlockName.MISSION]: {
		imgUrl: "https://result.school/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmission.9ce994b8.png&w=384&q=75",
		subTitle: "Миссия",
		text: "Текст миссии 1",
		subText: "Текст миссии 2"
	},
	[InfoBlockName.INTERNAZI]: {
		imgUrl: "https://result.school/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdifference.fe719db3.png&w=384&q=75",
		subTitle: "Интернационализация",
		text: "Текст интернационализации 1",
		subText: ""
	},
	[InfoBlockName.GET_STARTED]: {
		imgUrl: "https://result.school/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fattitude.c93063c0.png&w=384&q=75",
		subTitle: "Пора пробовать",
		text: "Текст пора пробовать 1",
		subText: "",
		buttonsText: ["поехали", "доп инфо"]
	},
}