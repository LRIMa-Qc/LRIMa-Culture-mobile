import type { Meta, StoryObj } from '@storybook/react';

import { TbTemperature as Icon } from "react-icons/tb"

import { Indicator } from './Indicator';
import { ChangeIndication } from '../change-indicator/ChangeIndication';
const meta = {
    title: 'AliveCulture/Indicator',
    component: Indicator,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Indicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Temperature: Story = {
    args: {
        Icon,
        label: "Température",
        color: "sky",
        children: <ChangeIndication change='+2%' value="25.7 °C" />,
        variant: "compact"
    }
};