import type { Meta, StoryObj } from "@storybook/react"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { AnketsSectionList } from "./AnketsSectionList"
import { SectionType } from "../../model/config"

const meta: Meta<typeof AnketsSectionList> = {
	title: "entity/AnketsSection/AnketsSectionList",
	component: AnketsSectionList,
}

export default meta
type Story = StoryObj<typeof AnketsSectionList>;


export const AnketsSectionListDefault: Story = {
	args: {
		
	},
}

export const AnketsSectionListDark: Story = {
	args: {
		
		
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}