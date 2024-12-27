import type { Preview } from "@storybook/react";
import '../app/globals.css';

import { Poppins as Font } from 'next/font/google';

const font = Font({
  weight: ['400', '500'],
  subsets: ['latin']
});

const preview: Preview = {
  decorators: [],
  tags: ["autodocs"]
};

export default preview;
