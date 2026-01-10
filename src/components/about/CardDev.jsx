import React from 'react';
import { Card } from 'antd';
import { useLanguage } from '../../hook/useLanguage';
import {dev} from '../../lib/dataAbout'
import {useRevealOnScroll} from '../../hook/useRevealOnScroll.jsx';
function CardPerson() {
    const { t } = useLanguage();
    const dataDev=dev(t);
    const { ref, show } = useRevealOnScroll();
    return (
        <Card ref={ref} className={`card-reveal ${show ? "show" : ""} mt-6`}>
            <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 font-mono text-xs text-slate-400">{t.personInfo.identity}</span>
            </div>
            <div>
                <p><span className='text-[#8a2ce2] font-bold mr-2'>const</span><span className='text-cyan-700'>dev</span> = {'{'}</p>
                {dataDev.map((item)=>(
                    <p key={item.id} className='ml-5'>{item.title}: <span className='ml-2 text-green-600'>'{item.value}'</span> ,</p>
                    ))}
                <p>{'};'}</p>
            </div>
        </Card>
    );
}

export default CardPerson;