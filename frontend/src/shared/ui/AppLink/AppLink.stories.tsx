import type { Meta, StoryObj } from "@storybook/react"
import { AppLink } from "./AppLink"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof AppLink> = {
	title: "shared/AppLink",
	component: AppLink,
}

export default meta
type Story = StoryObj<typeof AppLink>;

export const AppLinkLight: Story = {
	args: {
		children: "Link"
	},
}

export const AppLinkDark: Story = {
	args: {
		children: "Link"
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



