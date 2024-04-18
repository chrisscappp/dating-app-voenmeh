import type { Meta, StoryObj } from "@storybook/react"
import { Navbar } from "./Navbar"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { StoreDecorator } from "shared/config/storybookConfig/storeDecorator/StoreDecorator"

const meta: Meta<typeof Navbar> = {
	title: "widgets/Navbar",
	component: Navbar,
}

export default meta
type Story = StoryObj<typeof Navbar>;

export const NavbarLight: Story = {
	args: {},
	decorators: [StoreDecorator({})]
}

export const NavbarDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK), StoreDecorator({})]
}



