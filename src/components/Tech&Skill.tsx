'use client';
import React from 'react';
import { useLanguage } from '../hook/useLanguage';
import {Card} from 'antd';
import {useRevealOnScroll} from '../hook/useRevealOnScroll';
import { getDataSkill } from '../lib/dataSkill';
function TechSkill() {
    const { t } = useLanguage();
        const { ref, show } = useRevealOnScroll();
    const dataSkill=getDataSkill(t);
    return (
        <div className='md:mx-20 mx-5'>
            <div className='grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-4'>
                {dataSkill.map((item)=>(
                    <Card key={item.id} ref={ref} className={`surface card-reveal ${show ? "show" : ""} px-5`}>
                        <h3 className='text-lg mb-4 font-semibold text-text-light dark:text-text-dark'>{item.title}</h3>
                        <div className='flex flex-wrap gap-2'>
                            {item.skill.map((skillItem)=>(
                                <div key={skillItem.id}>
                                {skillItem.name ?(
                                    <div className='skill-chip'
                                     style={{ borderColor: skillItem.color, color: skillItem.color, backgroundColor: `${skillItem.color}20`}}>
                                     {skillItem.name}
                                     </div>
                                ):(
                                    <div className='w-full text-text-light dark:text-text-dark'>
                                        <p><span className='font-bold mr-2 '>{skillItem.title}:</span> {skillItem.des}</p>
                                     </div>
                                )
                                }
                                </div>
                            ))}
                            {item.des && 
                            <div className='w-full text-text-light dark:text-text-dark'>
                                <p>{item.des}</p>
                            </div>
                            }
                        </div>
                    </Card>
                ))}
            </div>
            
        </div>
    );
}

export default TechSkill;
