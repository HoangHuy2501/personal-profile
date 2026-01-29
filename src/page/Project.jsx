import React from 'react';
import { useLanguage } from '../hook/useLanguage';
import BoxProject from '../components/BoxProject';
import {dataProject} from '../lib/dataProject';
function Project() {
    const { t } = useLanguage();
    return (
        <div className='md:mx-20 mx-5'>
            <div className='md:w-1/2  text-text-light dark:text-text-dark'> 
                <h2 className='text-3xl'>{t.project.title}</h2>
                <p className='text-text-gray'>{t.project.des}</p>
            </div>
            {dataProject(t).map((item)=> (
                <div key={item.id} className='my-10'>
                    <BoxProject databox={item}/>
                </div>
            ))}
        </div>
    );
}

export default Project;