import type { Meta, StoryObj } from "@storybook/react"
import LikesPage from "./LikesPage"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof LikesPage> = {
	title: "pages/LikesPage",
	component: LikesPage,
}

export default meta
type Story = StoryObj<typeof LikesPage>;

export const LikesPageLight: Story = {
	args: {},
	decorators: []
}

export const LikesPageDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



