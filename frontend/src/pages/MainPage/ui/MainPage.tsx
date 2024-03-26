import React, { memo, useState } from "react"
import { MainPageTitle } from "./MainPageTitle/MainPageTitle"
import { MainPageInfo } from "./MainPageInfo/MainPageInfo"
import { MainPageDescription } from "./MainPageDescription/MainPageDescription"
import { InfoBlockName, mainPageInfoConfig } from "shared/config/mainPageInfoConfig/mainPageInfoConfig"
import { Input } from "shared/ui/Input/Input"

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
		<div>
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
		</div>
	)
}

export default memo(MainPage)