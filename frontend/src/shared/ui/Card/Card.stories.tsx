import type { Meta, StoryObj } from "@storybook/react"
import { Card } from "./Card"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof Card> = {
	title: "shared/Card",
	component: Card,
}

export default meta
type Story = StoryObj<typeof Card>;

export const CardDefault: Story = {
	args: {
		style: {
			width: 200,
			height: 400,
			margin: 20
		}
	},
}

export const CardDark: Story = {
	args: {
		style: {
			width: 200,
			height: 400,
			margin: 20
		}
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}
