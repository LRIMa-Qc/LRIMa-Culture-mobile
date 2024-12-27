import type { Meta, StoryObj } from '@storybook/react';

import { NavItem } from './NavItem';

import { TbHome as HomeIcon } from "react-icons/tb";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'AliveCulture/NavItem',
    component: NavItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
    args: {
        label: "Capteurs",
        href: "capteurs",
        Icon: HomeIcon
    }
};

export const Active: Story = {
    args: {
        label: "Capteurs",
        href: "capteurs",
        Icon: HomeIcon
    }
};