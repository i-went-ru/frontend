import { Meta, StoryFn } from "@storybook/react";
import { Select } from "./components/ui/select";

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
  argTypes: {
  },
  parameters: {
  },
  args: {
    
  }
}

export default meta;

const Template: StoryFn<typeof Select> = (args: any) => <Select {...args} />;

export const Default: StoryFn<typeof Select> = Template.bind({});
Default.args = {
    lists: [{id: 0, value: "14:00"}, {id: 1, value: "15:00"}, {id: 2, value: "15:00"}],
    label: "Выберите время",
    valueSelect: {id: 0, value: "14:00"},
};
