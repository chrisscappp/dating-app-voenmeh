import { AnketsSectionList } from "entity/AnketsSection"
import React, { memo } from "react"
import { Page } from "widgets/Page"

const AnketsPage = () => {
	
	return (
		<Page>
			<AnketsSectionList/>
		</Page>
	)
}

export default memo(AnketsPage)