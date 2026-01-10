import React from 'react';
import { useLanguage } from '../hook/useLanguage';
import {Card} from 'antd';
import {useRevealOnScroll} from '../hook/useRevealOnScroll.jsx';
import { getDataSkill } from '../lib/dataSkill.js';
function TechSkill() {
    const { t } = useLanguage();
        const { ref, show } = useRevealOnScroll();
    const dataSkill=getDataSkill(t);
    return (
        <div className='md:mx-20 mx-5'>
            <h2 className='text-text-light dark:text-text-dark text-3xl'>{t.techSkill.skill} & <span className='text-gradient'>{t.techSkill.tech}</span></h2>
            <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4'>
                {dataSkill.map((item)=>(
                    <Card key={item.id} ref={ref} className={`card-reveal ${show ? "show" : ""} px-5`}>
                        <h3 className='text-xl mb-4 text-text-light dark:text-text-dark'>{item.title}</h3>
                        <div className='flex flex-wrap gap-5'>
                            {item.skill.map((skillItem)=>(
                                <div key={skillItem.id}>
                                {skillItem.name ?(
                                    <div className={`border-2 rounded-lg p-2`}
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