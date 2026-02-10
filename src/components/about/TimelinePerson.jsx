import React from 'react';
import { useLanguage } from '../../hook/useLanguage';
import {timeline} from '../../lib/dataAbout'
function TimelinePerson() {
    const { t } = useLanguage();
    const dataTimeline=timeline(t);
    return (
        <div>
            {dataTimeline.map((item)=>(
                <div key={item.id} className='border-b border-gray-300 mt-10'>
                    <p className='text-[#8a2ce2] font-bold'>// {item.classify}</p>
                    <div className='border-l-4 border-gray-300 md:pl-10 pl-5 relative'>
                        <p className='text-[#8a2ce2]'>{item.time}</p>
                        <div className='bg-[#8a2ce2] p-2 rounded-full w-1 absolute left-[-10px] top-[-5px]'></div>
                        <h2 className='text-3xl text-text-light dark:text-text-dark'>{item.title}</h2>
                        {item.job ? 
                        <div className='text-gray-500'>
                            <p>{item.job}</p>
                            <p>{item.gpa}</p>
                        </div>
                        :
                        <div className='text-gray-500'>
                            <p><span className='font-bold text-text-light dark:text-text-dark mr-2'>{t.header.menu.project}:</span>{item.project}</p>
                            <p>{item.address}</p>
                            <p>{item.des}</p>
                        </div>
                        }
                    </div>
                    
                </div>
            ))}
        </div>
    );
}

export default TimelinePerson;