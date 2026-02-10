import React from 'react';
import { Card } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hook/useLanguage';
import { useRevealOnScroll } from '../../hook/useRevealOnScroll';
import {contactInfo} from '../../lib/dataContact'
import  openAppOrWeb  from '../../Utils/openAppOrWeb';
function CardContact() {
    const { t } = useLanguage();
    const { ref, show } = useRevealOnScroll();
    const dataContact = contactInfo(t);
    const handleClick = (item) => {
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

    if (item.appUrl && isMobile) {
      openAppOrWeb(item.appUrl, item.webUrl);
    } else if (item.webUrl) {
        if(item.webUrl==="#"){
            return
        }else{
            window.open(item.webUrl, "_blank", "noopener,noreferrer");
        }
    }
  };
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {dataContact.map((item) => {
                const Icon = item.icon;
                return (
                    <Card key={item.id} ref={ref} onClick={() => handleClick(item)} className={`card-reveal ${show ? "show" : ""} border dark:border-gray-600 rounded-lg px-3 py-1 text-sm font-medium text-text-light dark:text-text-dark`}>
                        <p className='w-min text-[#258cf4] text-2xl bg-[#afcbe8] px-3 py-1 rounded-lg'><Icon/></p>
                        <h3 className='capitalize text-text-light dark:text-text-dark text-xl'>{item.title}</h3>
                        <p className='text-gray-400'>{item.value}</p>
                    </Card>
                );
            })}
        </div>
    );
}

export default CardContact;