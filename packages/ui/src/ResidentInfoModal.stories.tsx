import { Meta, StoryFn } from "@storybook/react";
import { Floor } from "./components/ui/floor";
import { ResidentInfo } from "./components/ui/residentInfoModal";

const meta: Meta<typeof ResidentInfo> = {
    title: "ResidentInfoModal",
    component: ResidentInfo,
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

const Template: StoryFn<typeof ResidentInfo> = (args: any) => <ResidentInfo {...args} />;

export const Default: StoryFn<typeof ResidentInfo> = Template.bind({});
Default.args = {
    open: true,
    setOpen: (value: boolean) => {}
};

