import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertPosition, AlertTheme } from "./Alert"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof Alert> = {
	title: "shared/Alert",
	component: Alert,
}

export default meta
type Story = StoryObj<typeof Alert>;

export const AlertDefault: Story = {
	args: {
		text: "Alerttt",
		theme: AlertTheme.DEFAULT
	},
}

export const AlertDefaultDark: Story = {
	args: {
		text: "Alerttt",
		theme: AlertTheme.DEFAULT
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}

export const AlertSuccess: Story = {
	args: {
		text: "Alerttt",
		theme: AlertTheme.SUCCESS
	},
}

export const AlertSuccessDarkRightTopPos: Story = {
	args: {
		text: "Alerttt",
		theme: AlertTheme.SUCCESS,
		position: AlertPosition.TOP_RIGHT
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}

export const AlertWarningRightBottomPos: Story = {
	args: {
		text: "Alerttt",
		theme: AlertTheme.WARNING,
		position: AlertPosition.BOTTOM_RIGHT
	},
}

export const AlertWarningRightBottomPosDark: Story = {
	args: {
		text: "Alerttt",
		theme: AlertTheme.WARNING,
		position: AlertPosition.BOTTOM_RIGHT
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}

export const AlertErrorLeftBottomPos: Story = {
	args: {
		text: "Alerttt",
		theme: AlertTheme.ERROR,
		position: AlertPosition.BOTTOM_LEFT
	},
}

export const AlertErrorLeftBottomPosDark: Story = {
	args: {
		text: "Alerttt",
		theme: AlertTheme.ERROR,
		position: AlertPosition.BOTTOM_LEFT
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}

export const AlertErrorCustomPos: Story = {
	args: {
		text: "Alerttt",
		theme: AlertTheme.ERROR,
		top: 200,
		left: 130
	},
}