import { Meta, StoryFn } from "@storybook/react";
import { Carousel } from "./components/ui/carousel";

const meta: Meta<typeof Carousel> = {
    title: "Carousel",
    component: Carousel,
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

const Template: StoryFn<typeof Carousel> = (args: any) => <Carousel {...args} />;

export const Default: StoryFn<typeof Carousel> = Template.bind({});
Default.args = {
    slides: [
        <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
        />,
        <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
        />,
        <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
        />,
    ]
};
