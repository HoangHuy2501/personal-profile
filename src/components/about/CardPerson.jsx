import React from 'react';
import { Card } from 'antd';
import { useLanguage } from '../../hook/useLanguage';
import {personInfo} from '../../lib/dataAbout'
import {useRevealOnScroll} from '../../hook/useRevealOnScroll.jsx';
function CardPerson() {
    const { t } = useLanguage();
    const dataPerson = personInfo(t);
    const { ref, show } = useRevealOnScroll();
    return (
        <Card ref={ref} className={`card-reveal ${show ? "show" : ""} mt-6`}>
        <h2 className='text-gradient text-2xl'>{t.personInfo.title}</h2>
        {dataPerson.map((item)=>{
            const Icon = item.icon;
            return(
            <p key={item.id}>
            <span className='mr-4 text-[#8a2ce2] text-base'><Icon/></span>
            <span className='text-text-light dark:text-text-dark font-bold mr-2'>{item.title}:</span>
             {item.value}</p>
            )})}
        </Card>
    );
}

export default CardPerson;