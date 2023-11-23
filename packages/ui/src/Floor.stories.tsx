import { Meta, StoryFn } from "@storybook/react";
import { Floor } from "./components/ui/floor";
import floor7 from "../style/floors/floor7.svg";
import * as ContextMenu from '@radix-ui/react-context-menu';

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
    children: <image href={floor7} width="400" height="400" />,
    paths: [{ d: "M 23 198 L 61 201 L 60 224 L 21 230 Z", color: "#f5a623", text: "706", id: 1 },],
    markers: [{ point: { x: 100, y: 100 }, onClick: () => { }, color: "#f5a623" }],
    markerRadius: 2,
    menu:
        <>
            <ContextMenu.Label className="pl-[25px] text-xs leading-[25px] text-mauve11">
                ООО СмартКонтракт
            </ContextMenu.Label>
            <ContextMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                Удалить{' '}
            </ContextMenu.Item>
            <ContextMenu.Item
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
            >
                Редактировать{' '}
            </ContextMenu.Item>
        </>

};


export const Edit: StoryFn<typeof Floor> = Template.bind({});
Edit.args = {
    children: <image href={floor7} width="400" height="400" />,
    paths: [{ d: "M 23 198 L 61 201 L 60 224 L 21 230 Z", color: "#f5a623", text: "706", id: 1 }],
    isEditMarker: true,
    setPaths: (paths: any) => { },
    text: "701",
    color: "#f5a623",
    markers: [{ point: { x: 100, y: 100 }, onClick: () => { }, color: "#f5a623" }],
    markerRadius: 2,
    menu:
        <>
            <ContextMenu.Label className="pl-[25px] text-xs leading-[25px] text-mauve11">
                ООО СмартКонтракт
            </ContextMenu.Label>
            <ContextMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                Удалить{' '}
            </ContextMenu.Item>
            <ContextMenu.Item
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
            >
                Редактировать{' '}
            </ContextMenu.Item>
        </>
};
