import { Meta, StoryFn } from "@storybook/react";
import { Floor } from "./components/ui/Floor";

const meta: Meta<typeof Floor> = {
    title: "Floor",
    component: Floor,
    argTypes: {
    },
    parameters: {
        backgrounds: {
            default: 'dark'
        }
    },
    args: {
    }
}

export default meta;

const Template: StoryFn<typeof Floor> = (args: any) => <Floor {...args} />;

export const Default: StoryFn<typeof Floor> = Template.bind({});
Default.args = {
};
