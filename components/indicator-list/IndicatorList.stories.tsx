import type { Meta, StoryObj } from '@storybook/react';

import { TbTemperature as Icon } from "react-icons/tb"

import { IndicatorList } from './InidicatorList';
const meta = {
    title: 'AliveCulture/IndicatorList',
    component: IndicatorList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof IndicatorList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Temperature: Story = {
    args: {
        indicators: [
            {
                Icon,
                label: "Température",
                value: "25.7 °C",
                change: "+2%",
                color: "sky"
            },
            {
                Icon,
                label: "Luminosité",
                value: "2643 lumens",
                change: "-12%",
                color: "emerald"
            },
            {
                Icon,
                label: "Humidité",
                value: "26%",
                change: "+2%",
                color: "red"
            },
            {
                Icon,
                label: "Température",
                value: "25.7 °C",
                change: "+2%",
                color: "sky"
            },
        ]
    }
};