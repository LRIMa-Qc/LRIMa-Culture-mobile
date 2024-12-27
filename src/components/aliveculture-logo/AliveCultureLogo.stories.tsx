import type { Meta, StoryObj } from '@storybook/react';

import { AliveCultureLogo } from './AliveCultureLogo';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'AliveCulture/Logo',
    component: AliveCultureLogo,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AliveCultureLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};