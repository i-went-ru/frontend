import { Button } from "./components/ui/button";
import { Meta, StoryFn } from "@storybook/react";
import { Header } from "./components/ui/header";
import { UserIcon } from '@heroicons/react/24/outline'

const meta: Meta<typeof Header> = {
  title: "Header",
  component: Header,
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

const Template: StoryFn<typeof Header> = (args: any) => <Header {...args} />;

export const Default: StoryFn<typeof Header> = Template.bind({});
Default.args = {
  links: [
    { name: 'Предстоящие экскурсии', href: '#' },
    { name: 'Резиденты', href: '#' },
    { name: 'Обратная связь', href: '#' },
  ],
  children: 
  <>           
    <Button children="Вход" variant="secondary"/>
    <Button children="Регистрация" variant="default"/>
  </>
};

export const Auth: StoryFn<typeof Header> = Template.bind({});
Auth.args = {
  links: [
    { name: 'Предстоящие экскурсии', href: '#' },
    { name: 'Резиденты', href: '#' },
    { name: 'Обратная связь', href: '#' },
  ],
  children: 
  <>           
    <Button size="icon" children={<UserIcon className="h-6"/>}/>
  </>
};
