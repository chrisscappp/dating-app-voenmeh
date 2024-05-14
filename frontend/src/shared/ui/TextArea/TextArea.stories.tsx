import type { Meta, StoryObj } from "@storybook/react"
import { TextArea } from "./TextArea"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof TextArea> = {
	title: "shared/TextArea",
	component: TextArea,
}

export default meta
type Story = StoryObj<typeof TextArea>;

export const TextAreaPrimary: Story = {
	args: {
		placeholder: "asdfghgfdasff"
	},
}

export const TextAreaPrimaryDark: Story = {
	args: {
		placeholder: "asdfghgfdasff"
	},
	decorators: ThemeDecorator(Themes.DARK)
}

export const TextAreaReadonly: Story = {
	args: {
		placeholder: "asdfghgfdasff",
		readonly: true
	},
}

export const TextAreaReadonlyDark: Story = {
	args: {
		placeholder: "asdfghgfdasff",
		readonly: true
	},
	decorators: ThemeDecorator(Themes.DARK)
}