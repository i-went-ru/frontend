import { Meta, StoryFn } from "@storybook/react";
import { CardResident1 } from "./components/ui/cardResident1";

const meta: Meta<typeof CardResident1> = {
    title: "CardResident1",
    component: CardResident1,
    argTypes: {
    },
    parameters: {
    },
    args: {
    }
}

export default meta;

const Template: StoryFn<typeof CardResident1> = (args: any) => <CardResident1 {...args} />;

export const Default: StoryFn<typeof CardResident1> = Template.bind({});
Default.args = {
    name: "Биотехнологии",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    labels: ["exposkils", "rum", "Моя профессия IT", "altan school"]
};
