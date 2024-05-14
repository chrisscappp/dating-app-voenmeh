import type { Meta, StoryObj } from "@storybook/react"
import { Page } from "./Page"
import React from "react"

const meta: Meta<typeof Page> = {
	title: "widgets/Page",
	component: Page,
}

export default meta
type Story = StoryObj<typeof Page>;

export const PagePrimary: Story = {
	args: {
		children: "ddajdas"
	},
}
