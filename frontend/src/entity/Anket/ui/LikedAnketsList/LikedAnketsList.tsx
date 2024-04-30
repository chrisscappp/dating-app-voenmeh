import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import cls from "./LikedAnketsList.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { fetchLikedAnkets } from "../../model/services/fetchLikedAnkets/fetchLikedAnkets"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect"
import { getLikedAnkets } from "../../model/slice/likedAnketsSlice/likedAnketsSlice"
import { useSelector } from "react-redux"
import { getLikedAnketsError } from "../../model/selectors/getLikedAnketsError/getLikedAnketsError"
import { getLikedAnketsIsLoading } from "../../model/selectors/getLikedAnketsIsLoading/getLikedAnketsIsLoading"

export const LikedAnketsList = memo(() => {

	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const likedAnkets = useSelector(getLikedAnkets.selectAll)
	const error = useSelector(getLikedAnketsError)
	const isLoading = useSelector(getLikedAnketsIsLoading)

	useInitialEffect(() => {
		dispatch(fetchLikedAnkets())
	})

	console.log("likedAnkets", likedAnkets)
	
	return (
		<div className = {classNames(cls.LikedAnketsList, {}, [])}>

		</div>
	)
})