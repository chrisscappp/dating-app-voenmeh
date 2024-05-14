import type { Meta, StoryObj } from "@storybook/react"
import { Themes } from "app/providers/ThemeProvider"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import React from "react"
import { AvatarDetailModal } from "./AvatarDetail"
import Default from "../../Anket/ui/AnketCard/default.jpg"

const meta: Meta<typeof AvatarDetailModal> = {
	title: "entity/AvatarDetailModal",
	component: AvatarDetailModal,
}

export default meta
type Story = StoryObj<typeof AvatarDetailModal>;


export const AvatarDetailModalDefault: Story = {
	args: {
		src: Default,
		isOpen: true
	},
}

export const AvatarDetailModalDark: Story = {
	args: {
		src: Default,
		isOpen: true
	},
	decorators: [ThemeDecorator(Themes.DARK)]
}