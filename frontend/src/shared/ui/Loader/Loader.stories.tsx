import type { Meta, StoryObj } from "@storybook/react"
import { Loader } from "./Loader"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof Loader> = {
	title: "shared/Loader",
	component: Loader,
}

export default meta
type Story = StoryObj<typeof Loader>;

export const LoaderLight: Story = {
	args: {},
}

export const LoaderDark: Story = {
	args: {	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



