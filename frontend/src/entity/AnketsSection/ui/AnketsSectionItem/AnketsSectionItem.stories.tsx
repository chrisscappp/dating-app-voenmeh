import type { Meta, StoryObj } from "@storybook/react"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { AnketsSectionItem } from "./AnketsSectionItem"
import { SectionType } from "../../model/config"

const meta: Meta<typeof AnketsSectionItem> = {
	title: "entity/AnketsSection/AnketsSectionItem",
	component: AnketsSectionItem,
}

export default meta
type Story = StoryObj<typeof AnketsSectionItem>;


export const AnketsSectionItemDefault: Story = {
	args: {
		section: {
			title: "aboba",
			gradient: "red",
			gradientDark: "blue",
			colors: {
				dark: "blue",
				light: "red"
			},
			type: SectionType.BOYS
		}
	},
}

export const AnketsSectionItemDark: Story = {
	args: {
		section: {
			title: "aboba",
			gradient: "red",
			gradientDark: "blue",
			colors: {
				dark: "blue",
				light: "red"
			},
			type: SectionType.BOYS
		}
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}