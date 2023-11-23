import { Meta, StoryFn } from "@storybook/react";
import { Floor } from "./components/ui/floor";
import floor7 from "../style/floors/floor7.svg";
import { StreetView2D } from "./components/ui/streetview2d";

const meta: Meta<typeof StreetView2D> = {
    title: "StreetView2D",
    component: StreetView2D,
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

const Template: StoryFn<typeof StreetView2D> = (args: any) => <StreetView2D {...args} />;

export const Default: StoryFn<typeof StreetView2D> = Template.bind({});
Default.args = {
    children: <img src={"https://via.placeholder.com/400x700"} alt="Изображение" className="max-w-xs"/>
};