import type { Meta, StoryObj } from "@storybook/react"
import { Avatar } from "./Avatar"
import React from "react"
import AvatarImgDefault from "./avatar-default.png"

const meta: Meta<typeof Avatar> = {
	title: "shared/Avatar",
	component: Avatar,
}

export default meta
type Story = StoryObj<typeof Avatar>;

export const AvatarDefault: Story = {
	args: {
		src: AvatarImgDefault 
	},
}

