import React from 'react';
import { Card } from 'antd';
import { useLanguage } from '../../hook/useLanguage';
import {hobbies} from '../../lib/dataAbout'
import {useRevealOnScroll} from '../../hook/useRevealOnScroll.jsx';
function Hobbies() {
    const { t } = useLanguage();
    const dataHobbies=hobbies(t);
    const { ref, show } = useRevealOnScroll();
    return (
        <div className='mt-6'>
            <p className='text-[#8a2ce2] font-bold'>// {t.personInfo.hobbies.classify}</p>
            {dataHobbies.map((item)=>{
                const Icon=item.icon;
                return(
                <Card key={item.id} ref={ref} className={`card-reveal ${show ? "show" : ""} inline-flex items-center gap-3 border dark:border-gray-600 rounded-full px-3 py-1 text-sm font-medium text-text-light dark:text-text-dark m-2`} styles={{body:{padding:5, display:"flex", alignItems:"center"}}}>
                <span className='text-[#8a2ce2] mr-2'><Icon/></span>
                <span>{item.name}</span>
                </Card>
            )})}
        </div>
    );
}

export default Hobbies;