import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "./Skeleton"
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator"
import { Themes } from "app/providers/ThemeProvider"

const meta: Meta<typeof Skeleton> = {
	title: "shared/Skeleton",
	component: Skeleton,
	args: {}
}

export default meta
type Story = StoryObj<typeof Skeleton>;

export const SkeletonDefault: Story = {
	args: {
		width: "100%",
		height: 200
	},
}

export const SkeletonCircle: Story = {
	args: {
		border: "50%",
		width: 100,
		height: 100
	},
}

export const SkeletonDark: Story = {
	args: {
		width: "100%",
		height: 200
	},
	decorators: ThemeDecorator(Themes.DARK)
}

export const SkeletonCircleDark: Story = {
	args: {
		border: "50%",
		width: 100,
		height: 100
	},
	decorators: ThemeDecorator(Themes.DARK)
}
