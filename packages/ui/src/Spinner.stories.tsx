import { Meta, StoryFn } from "@storybook/react";
import {Spinner} from "./components/ui/spinner";

const meta: Meta<typeof Spinner> = {
  title: "Spinner",
  component: Spinner,
  argTypes: {
  },
  parameters: {
  },
  args: {
    
  }
}

export default meta;

const Template: StoryFn<typeof Spinner> = (args: any) => <Spinner {...args} />;

export const Default: StoryFn<typeof Spinner> = Template.bind({});
Default.args = {
};