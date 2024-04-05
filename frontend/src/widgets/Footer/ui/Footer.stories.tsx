import type { Meta, StoryObj } from "@storybook/react"
import { Footer } from "./Footer"
import React from "react"

const meta: Meta<typeof Footer> = {
	title: "widgets/Footer",
	component: Footer,
}

export default meta
type Story = StoryObj<typeof Footer>;

export const FooterDefault: Story = {
	args: {},
}




