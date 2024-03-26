import React from "react"
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Themes } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybookConfig/themeDecorator/themeDecorator";

const meta: Meta<typeof Modal> = {
	title: "shared/Modal",
  	component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;


export const Primary: Story = {
	args: {
		children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolor molestias iusto dolorem quam necessitatibus quae quis doloremque ut expedita, tempora provident dolore atque voluptatem aspernatur possimus error aut sequi?",
		isOpen: true
	},
};

export const Dark: Story = {
	args: {
		children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolor molestias iusto dolorem quam necessitatibus quae quis doloremque ut expedita, tempora provident dolore atque voluptatem aspernatur possimus error aut sequi?",
		isOpen: true
	},
	decorators: [ThemeDecorator(Themes.DARK)]
};
