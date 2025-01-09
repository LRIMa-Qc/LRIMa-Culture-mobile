import type { Meta, StoryObj } from '@storybook/react';

import { TbTemperature as Icon } from "react-icons/tb"

import { ChangeIndicatorList } from './ChangeInidicatorList';
const meta = {
    title: 'AliveCulture/IndicatorList',
    component: ChangeIndicatorList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ChangeIndicatorList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Temperature: Story = {
    args: {
        indicators: [
            {
                Icon,
                label: "Température",
                value: "25.7 °C",
                color: "sky"
            },
            {
                Icon,
                label: "Luminosité",
                value: "2643 lumens",
                color: "emerald"
            },
            {
                Icon,
                label: "Humidité",
                value: "26%",
                color: "red"
            },
            {
                Icon,
                label: "Température",
                value: "25.7 °C",
                color: "sky"
            },
        ]
    }
};