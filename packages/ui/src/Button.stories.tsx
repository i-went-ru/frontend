import { Button } from "./components/ui/button";
import { Meta, StoryFn } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    size: {
      options: ['default', 'sm', 'lg', 'icon'],
      control: { type: 'select',},
    }
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  args: {
    children: 'Button',
  }
}

export default meta;

const Template: StoryFn<typeof Button> = (args: any) => <Button {...args} />;

export const Default: StoryFn<typeof Button> = Template.bind({});
Default.args = {

};

export const Secondary: StoryFn<typeof Button> = Template.bind({});
Secondary.args = {
  variant: "secondary"
};

export const Disabled: StoryFn<typeof Button> = Template.bind({});
Disabled.args = {
  variant: "disabled",
  disabled: true,
};