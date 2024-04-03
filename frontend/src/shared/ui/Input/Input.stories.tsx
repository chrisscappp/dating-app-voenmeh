import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./Input"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof Input> = {
	title: "shared/Input",
	component: Input,
}

export default meta
type Story = StoryObj<typeof Input>;

export const DefaultInput: Story = {
	args: {
		value: "Text",
		placeholder: "light theme"
	},
}

export const DefaultInputReadonly: Story = {
	args: {
		value: "Text",
		placeholder: "light theme",
		readonly: true
	},
}

export const DefaultInputDark: Story = {
	args: {
		value: "Text",
		placeholder: "dark theme"
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}