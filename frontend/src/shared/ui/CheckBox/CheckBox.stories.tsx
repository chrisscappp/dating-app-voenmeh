import type { Meta, StoryObj } from "@storybook/react"
import { CheckBox } from "./CheckBox"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof CheckBox> = {
	title: "shared/CheckBox",
	component: CheckBox,
}

export default meta
type Story = StoryObj<typeof CheckBox>;

export const CheckBoxChecked: Story = {
	args: {
		value: true
	},
}

export const CheckBoxDark: Story = {
	args: {
		value: false
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}



