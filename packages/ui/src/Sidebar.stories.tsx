import { Meta, StoryFn } from "@storybook/react";
import { Sidebar } from "./components/ui/sidebar";
import { UserIcon } from "@heroicons/react/24/outline";

const meta: Meta<typeof Sidebar> = {
    title: "Sidebar",
    component: Sidebar,
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

const Template: StoryFn<typeof Sidebar> = (args: any) => <Sidebar {...args} />;

export const Default: StoryFn<typeof Sidebar> = Template.bind({});
Default.args = {
    children: <img src={"https://via.placeholder.com/400x700"} alt="Изображение" className="max-w-xs" />,
    navigations: [{ name: "Статистика", href: "#", current: true, icon: UserIcon}, { name: "Резиденты", href: "#", current: true, icon: UserIcon}, { name: "Посетители", href: "#", current: true,icon: UserIcon }]
};