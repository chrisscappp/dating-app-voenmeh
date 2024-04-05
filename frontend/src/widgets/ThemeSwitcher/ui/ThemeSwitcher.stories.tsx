import type { Meta, StoryObj } from "@storybook/react"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator"

const meta: Meta<typeof ThemeSwitcher> = {
	title: "widgets/ThemeSwitcher",
	component: ThemeSwitcher,
}

export default meta
type Story = StoryObj<typeof ThemeSwitcher>;

export const ThemeSwitcherLight: Story = {
	args: {},
}

export const ThemeSwitcherDark: Story = {
	args: {},
	decorators: [ThemeDecorator(Themes.DARK)]
}



