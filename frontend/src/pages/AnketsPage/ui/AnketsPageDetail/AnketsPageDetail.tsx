import React, { memo } from "react"
import { useParams } from "react-router"
import { Page } from "widgets/Page"

const AnketsPage = () => {
	
	const { sectionType: section } = useParams()

	console.log("PAEAM", section)

	return (
		<Page>
			{section}
		</Page>
	)
}

export default memo(AnketsPage)