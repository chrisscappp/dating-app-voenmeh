import type { Meta, StoryObj } from "@storybook/react"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { EmptyAnkets } from "./EmptyAnkets"

const meta: Meta<typeof EmptyAnkets> = {
	title: "entity/Anket/EmptyAnkets",
	component: EmptyAnkets,
}

export default meta
type Story = StoryObj<typeof EmptyAnkets>;


export const EmptyAnketsDefault: Story = {
	args: {
		
	},
}

export const EmptyAnketsDark: Story = {
	args: {
		
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}