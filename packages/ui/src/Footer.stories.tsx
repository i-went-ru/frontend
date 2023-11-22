import { Button } from "./components/ui/button";
import { Meta, StoryFn } from "@storybook/react";
import { UserIcon } from '@heroicons/react/24/outline'
import { Footer } from "./components/ui/footer";

const meta: Meta<typeof Footer> = {
  title: "Footer",
  component: Footer,
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

const Template: StoryFn<typeof Footer> = (args: any) => <Footer {...args} />;

export const Default: StoryFn<typeof Footer> = Template.bind({});
Default.args = {
  links: [
    { name: 'Предстоящие экскурсии', href: '#' },
    { name: 'Резиденты', href: '#' },
    { name: 'Обратная связь', href: '#' },
  ],
};