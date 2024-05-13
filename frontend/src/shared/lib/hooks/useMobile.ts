import { useEffect, useState } from "react"
import { MOBILE_WIDTH } from "shared/consts/common"

export function useMobile() {
	const [ mobile, setMobile ] = useState<boolean>(false)

	useEffect(() => {
		if (window.innerWidth <= MOBILE_WIDTH) {
			setMobile(true)
		}
	}, [])

	return mobile
}