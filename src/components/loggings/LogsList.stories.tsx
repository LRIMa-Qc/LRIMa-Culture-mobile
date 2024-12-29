import type { Meta, StoryObj } from '@storybook/react';

import { LogsList } from './LogsList';

const meta = {
    title: 'AliveCulture/LogsList',
    component: LogsList,
    tags: ['autodocs'],
} satisfies Meta<typeof LogsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        logs: [
            {
                message: "Relais 1 déconnecté",
                timestamp: new Date(2024, 12, 10, 5, 29)
            },
            {
                message: "Relais 2 déconnecté",
                timestamp: new Date(2024, 12, 10, 5, 24)
            },
            {
                message: "Relais 4 déconnecté",
                timestamp: new Date(2024, 12, 10, 5, 23)
            },
            {
                message: "Relais 5 déconnecté",
                timestamp: new Date(2024, 12, 10, 5, 22)
            },

            {
                message: "Relais 1 déconnecté",
                timestamp: new Date(2024, 12, 10, 4, 29)
            },
            {
                message: "Relais 2 déconnecté",
                timestamp: new Date(2024, 12, 10, 4, 24)
            },
            {
                message: "Relais 4 déconnecté",
                timestamp: new Date(2024, 12, 10, 3, 23)
            },
            {
                message: "Relais 5 déconnecté",
                timestamp: new Date(2024, 12, 10, 2, 22)
            },
        ]
    }
};