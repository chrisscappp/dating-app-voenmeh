import { Decorator } from "@storybook/react"
import { BrowserRouter } from "react-router-dom"
import React from "react"

export const RouterDecorator: Decorator = (story) => {
	return (
		<BrowserRouter>
			{story()}
		</BrowserRouter>
	)
} 