import type { Meta, StoryObj } from "@storybook/react"
import NotFoundPage from "./NotFoundPage"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof NotFoundPage> = {
	title: "pages/NotFoundPage",
	component: NotFoundPage,
}

export default meta
type Story = StoryObj<typeof NotFoundPage>;

export const NotFoundPageLight: Story = {
	args: {},
	decorators: []
}

export const NotFoundPageDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



