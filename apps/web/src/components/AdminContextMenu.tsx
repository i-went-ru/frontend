import * as ContextMenu from '@radix-ui/react-context-menu';
import { fetcher } from '../utils/fetch';
import { mutate } from 'swr';
import Link from 'next/link';

const AdminContextMenu = ({ idCabinet }: any) => {
    const DeleteCabinet = async() => {
        try{
            await fetcher(`/cabinets/${idCabinet}/`, 'DELETE')
            await mutate('/cabinets/')
        }catch(e:any){
            
        }
    }
    return (<>
        <ContextMenu.Label className="pl-[25px] text-xs leading-[25px] text-mauve11">
            Управление кабинетом
        </ContextMenu.Label>
        <ContextMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
        >
            <Link href={`/admin/floor/cabinet/${idCabinet}`}>
            Изменить
            </Link>

        </ContextMenu.Item>
        <ContextMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
            onClick={() => {DeleteCabinet()}}
        >
            Удалить{' '}
        </ContextMenu.Item>
    </>)
};

export default AdminContextMenu