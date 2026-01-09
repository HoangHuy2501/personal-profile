import React, { useMemo } from 'react';
import wf from '../assets/image/wf.png';
import { useLanguage } from "../hook/useLanguage";
import ButtonLightDark from './ButtonLightDark.jsx';
import { NavLink } from 'react-router-dom';
import ButtonLanguage from './ButtonLanguage.jsx';
import clsx from "clsx";
function Header() {
    const { t} = useLanguage();
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
    return (
        <div>
            <div  className='w-full flex justify-between bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 shadow-md'>
                <div className='flex w-1/5'>
                    <img src={wf} alt="Logo" style={{ width: '50px', height: '50px' }} className='ml-10 mt-3'/>
                    <h6 className='py-6 px-3 text-text-light dark:text-text-dark'>{t.header.namedev}</h6>
                </div>
                <div className='p-5'>
                    {data.map((item)=>(
                        <NavLink to={item.url} key={item.id} className={({isActive})=>clsx("inline-block px-3 py-1 transition-all hover:-translate-y-[5px]",isActive ? ' text-cyan-500 dark:text-cyan-400 ' :' text-text-light dark:text-text-dark')}
                        >{item.title}</NavLink> 
                    ))}
                </div>
                <div className='w-1/6 flex justify-around py-4'>
                    <ButtonLightDark />
                    <ButtonLanguage />
                </div>
            </div>
        </div>
    );
}

export default Header;