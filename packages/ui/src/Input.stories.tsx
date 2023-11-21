import { Meta, StoryFn } from "@storybook/react";
import { Input } from "./components/ui/input";
import { HeartIcon } from "@radix-ui/react-icons";

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
  argTypes: {
  },
  parameters: {
  },
  args: {
    
  }
}

export default meta;

const Template: StoryFn<typeof Input> = (args: any) => <Input {...args} />;

export const Default: StoryFn<typeof Input> = Template.bind({});
Default.args = {
    variant: "default"
};

export const Error: StoryFn<typeof Input> = Template.bind({});
Error.args = {
  variant: "error",
  errorMessage: "ОШИБКА!!!"
};

export const IconLeft: StoryFn<typeof Input> = Template.bind({});
IconLeft.args = {
  variant: "iconleft",
  icon: {element: <HeartIcon className="h-full"/>, position: "left"}
};

export const IconRight: StoryFn<typeof Input> = Template.bind({});
IconRight.args = {
  variant: "iconright",
  icon: {element: <HeartIcon className="h-full"/>, position: "right"}
};

export const Password: StoryFn<typeof Input> = Template.bind({});
Password.args = {
  variant: "iconright",
  password: true,
};