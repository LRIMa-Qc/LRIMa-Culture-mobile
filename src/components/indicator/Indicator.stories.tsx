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

export const Compact: Story = {
    args: {
        Icon,
        label: "Capteur 2",
        color: "sky",
        children: <p className='font-medium'>En marche</p>,
        variant: "compact"
    }
};

export const Large: Story = {
    args: {
        Icon,
        label: "Température",
        color: "sky",
        children: <ChangeIndication value="25.7 °C" />,
        variant: "large"
    }
};