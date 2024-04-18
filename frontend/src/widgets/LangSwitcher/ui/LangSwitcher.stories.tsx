import type { Meta, StoryObj } from "@storybook/react"
import { LangSwitcher } from "./LangSwitcher"
import React from "react"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import { Themes } from "app/providers/ThemeProvider"

const meta: Meta<typeof LangSwitcher> = {
	title: "widgets/LangSwitcher",
	component: LangSwitcher,
}

export default meta
type Story = StoryObj<typeof LangSwitcher>;

export const LangSwitcherLight: Story = {
	args: {

	},
}

export const LangSwitcherDark: Story = {
	args: {

	},
	decorators: [ThemeDecorator(Themes.DARK)]
}


