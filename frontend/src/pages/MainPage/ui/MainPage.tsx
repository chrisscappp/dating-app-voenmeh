import React, { memo } from "react"
import { MainPageTitle } from "./MainPageTitle/MainPageTitle"
import { MainPageInfo } from "./MainPageInfo/MainPageInfo"
import { MainPageDescription } from "./MainPageDescription/MainPageDescription"
import { InfoBlockName, mainPageInfoConfig } from "shared/config/mainPageInfoConfig/mainPageInfoConfig"
import { Page } from "widgets/Page"

const firstInfoPart = {
	[InfoBlockName.RESULT]: mainPageInfoConfig.resultBlock,
	[InfoBlockName.MISSION]: mainPageInfoConfig.missionBlock,
}

const secondInfoPart = {
	[InfoBlockName.INTERNAZI]: mainPageInfoConfig.internaziBlock,
	[InfoBlockName.GET_STARTED]: mainPageInfoConfig.getStartedBlock,
}

const MainPage = () => {

	return (
		<Page>
			<MainPageTitle/>
			<MainPageInfo
				//@ts-ignore
				infoObject = {firstInfoPart}
			/>
			<MainPageDescription/>
			<MainPageInfo
				//@ts-ignore
				infoObject = {secondInfoPart}
			/>
		</Page>
	)
}

export default memo(MainPage)