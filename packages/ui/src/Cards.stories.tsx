import { Meta, StoryFn } from "@storybook/react";
import { Cards } from "./components/ui/cards";

const meta: Meta<typeof Cards> = {
    title: "Cards",
    component: Cards,
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

const Template: StoryFn<typeof Cards> = (args: any) => <Cards {...args} />;

export const Default: StoryFn<typeof Cards> = Template.bind({});
Default.args = {
    label: "Технопарк в цифрах",
    description: "Информация про ИТпарк",
    stats: [
        {id: 0, name: "Резидентов", value: "159"},
        {id: 1, name: "Партнеров", value: ">100"},
        {id: 2, name: "Выручка резидентов", value: "2 млрд."},
        {id: 3, name: "Площадь технопарка", value: "20 816м2"},
    ]
};
