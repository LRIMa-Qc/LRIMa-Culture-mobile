import type { Meta, StoryObj } from '@storybook/react';

import { TbAt as Icon } from "react-icons/tb"

import { Input } from './Input';

const meta = {
    title: 'AliveCulture/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        Icon,
        type: 'email',
        placeholder: "Entrez votre adresse courriel"
    }
};