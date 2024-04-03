import type { Meta, StoryObj } from "@storybook/react"
import { Text, TextAlign, TextSize, TextTheme } from "./Text"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"

const meta: Meta<typeof Text> = {
	title: "shared/Text",
	component: Text,
}

export default meta
type Story = StoryObj<typeof Text>;

export const TextPrimary: Story = {
	args: {
		theme: TextTheme.PRIMARY,
		text: "Text"
	},
}

export const TextPrimaryDark: Story = {
	args: {
		theme: TextTheme.PRIMARY,
		text: "Text"
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}

export const TextSecondary: Story = {
	args: {
		theme: TextTheme.SECONDARY,
		text: "Text"
	},
}

export const TextSecondaryDark: Story = {
	args: {
		theme: TextTheme.SECONDARY,
		text: "Text"
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}

export const TextGrey: Story = {
	args: {
		theme: TextTheme.GREY,
		text: "Text"
	},
}

export const TitlePrimary: Story = {
	args: {
		theme: TextTheme.PRIMARY,
		title: "Text"
	},
}

export const TitlePrimaryDark: Story = {
	args: {
		theme: TextTheme.PRIMARY,
		title: "Text"
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}

export const TextPrimaryS: Story = {
	args: {
		theme: TextTheme.PRIMARY,
		text: "Text",
		size: TextSize.S
	},
}

export const TextPrimaryM: Story = {
	args: {
		theme: TextTheme.PRIMARY,
		text: "Text",
		size: TextSize.M
	},
}

export const TextPrimaryL: Story = {
	args: {
		theme: TextTheme.PRIMARY,
		text: "Text",
		size: TextSize.L
	},
}

export const TextPrimaryXL: Story = {
	args: {
		theme: TextTheme.PRIMARY,
		text: "Text",
		size: TextSize.XL
	},
}

export const TextPrimaryXXL: Story = {
	args: {
		theme: TextTheme.PRIMARY,
		text: "Text",
		size: TextSize.XXL
	},
}