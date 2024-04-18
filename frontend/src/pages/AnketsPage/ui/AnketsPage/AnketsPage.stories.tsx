import type { Meta, StoryObj } from "@storybook/react"
import AnketsPage from "./AnketsPage"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof AnketsPage> = {
	title: "pages/AnketsPage",
	component: AnketsPage,
}

export default meta
type Story = StoryObj<typeof AnketsPage>;

export const AnketsPageLight: Story = {
	args: {},
	decorators: []
}

export const AnketsPageDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



