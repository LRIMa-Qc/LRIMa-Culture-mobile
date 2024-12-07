import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Nav } from './Nav';
const meta = {
    title: 'AliveCulture/Nav',
    component: Nav,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onCloseClick: fn()
    }
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {

};