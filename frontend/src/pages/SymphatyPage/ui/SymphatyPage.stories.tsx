import type { Meta, StoryObj } from "@storybook/react"
import SymphatyPage from "./SymphatyPage"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof SymphatyPage> = {
	title: "pages/SymphatyPage",
	component: SymphatyPage,
}

export default meta
type Story = StoryObj<typeof SymphatyPage>;

export const SymphatyPageLight: Story = {
	args: {},
	decorators: []
}

export const SymphatyPageDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



