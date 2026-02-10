import React, { useEffect, useMemo, useState } from 'react';
import wf from '../assets/image/wf.png';
import { useLanguage } from "../hook/useLanguage";
import ButtonLightDark from './ButtonLightDark.jsx';
import { NavLink } from 'react-router-dom';
import ButtonLanguage from './ButtonLanguage.jsx';
import clsx from "clsx";
import{ MenuUnfoldOutlined } from '@ant-design/icons'; // MenuUnfoldOutlined
function Header({onclose}) {
    const { t} = useLanguage();
    const [open, setOpen] = useState(false);
    const data=useMemo(()=>[
        {
            id: 1,
            title: t.header.menu.home,
            url: '/home'
        },{
            id: 2,
            title: t.header.menu.about,
            url: '/about'
        },{
            id: 3,
            title: t.header.menu.project,
            url: '/project'
        },{
            id: 4,
            title: t.header.menu.contact,
            url: '/contact'
        }
    ]);
    useEffect(() => {
        if(onclose=== true){
            setOpen(false);
        }
    }, [onclose]);
    const handleOpen=() =>{
            setOpen(!open);
        
    }
    const namedev=() =>{
        return (
                <div className='md:flex '>
                    <img src={wf} alt="Logo" style={{ width: '50px', height: '50px' }} className='mx-auto md:ml-6 mt-3'/>
                    <h6 className='md:py-6 px-3 mb-8 md:mb-0 text-text-light dark:text-text-dark'>{t.header.namedev}</h6>
                </div>
        )
    }
    const button=() =>{
        return (
            <div className='md:flex md:gap-4'>
                    <ButtonLightDark />
                    <ButtonLanguage />
                </div>
        )
    }
    return (
        <div>
            <div  className='w-full flex justify-between bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 shadow-md'>
            <div className='w-1/5 hidden md:flex'>
                {namedev()}
            </div>
                <div className='p-3 md:p-5'>
                    {data.map((item)=>(
                        <NavLink to={item.url} key={item.id} onClick={()=> setOpen(false)} className={({isActive})=>clsx("inline-block px-3 py-1 transition-all hover:-translate-y-[5px]",isActive ? ' text-cyan-500 dark:text-cyan-400 ' :' text-text-light dark:text-text-dark')}
                        >{item.title}</NavLink> 
                    ))}
                </div>
                <div className='md:hidden text-3xl py-3 pr-3 text-text-light dark:text-text-dark' onClick={handleOpen}>
                    <MenuUnfoldOutlined />
                </div>
                <div className='md:w-1/6  md:py-4 hidden md:flex '>
                    {button()}
                </div>
            </div>
            {open && <div className=' bg-background-light dark:bg-background-dark  dark:border-gray-800 shadow-md w-2/5 fixed right-0 text-center h-screen md:hidden z-10'>
                    {namedev()}
                    {button()}
            </div>}
        </div>
    );
}

export default Header;