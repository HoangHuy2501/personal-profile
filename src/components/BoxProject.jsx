import React, { useEffect, useState } from 'react';
import {Card, Flex} from 'antd';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../hook/useLanguage';
import IframeWeb from '../components/IframeWeb';
function BoxProject({databox}) {
    const { t } = useLanguage();
    
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
    let number = isMobile? 1 : databox.n || 1;
    return (
        <Card>
            {number === 1 ?
            <div className='md:flex justify-between gap-5'>
            <div className='md:w-1/3'>
                <IframeWeb url={databox.url}/>
            </div>
            <div className='md:w-2/3 text-text-light dark:text-text-dark'>
                <NavLink to={databox.url} target="_blank" rel="noopener noreferrer">
                <h3 className=' text-2xl'>{databox.title}</h3>
                </NavLink>
                <div className='md:flex justify-between'>
                    <div className='md:w-1/3'>
                        <p> <span className='font-bold mr-4'>{t.project.box.position} :</span>{databox.position}</p>
                        <p><span className='font-bold mr-4'>{t.project.box.time} :</span>{databox.time}</p>
                        <p><span className='font-bold mr-4'>{t.project.box.teamSize} :</span> {databox.teamSize}</p>
                    </div>
                    <div className='md:w-2/3'>
                        <p className='font-bold'>{t.project.box.technology} :</p>
                        <ul className='list-disc list-inside ml-5'>
                            <li><span>BE :</span> {databox.tech.BE}</li>
                            <li><span>FE :</span> {databox.tech.FE}</li>
                            <li><span>DB :</span> {databox.tech.DB}</li>
                        </ul>
                    </div>
                </div>
                <p><span className='font-bold mr-4'>{t.project.box.acount} :</span> {databox.acount.tk} - {databox.acount.mk}</p>
                <p><span className='font-bold mr-4'>{t.project.box.des} :</span> {databox.des}</p>
            </div>
            </div> :
            <div className='md:flex justify-between'>
                
            <div className='md:w-2/3 text-text-light dark:text-text-dark'>
                <NavLink to={databox.url} target="_blank" rel="noopener noreferrer">
                <h3 className=' text-2xl'>{databox.title}</h3>
                </NavLink>
                <div className='md:flex justify-between'>
                    <div className='md:w-1/3'>
                        <p> <span className='font-bold mr-4'>{t.project.box.position} :</span>{databox.position}</p>
                        <p><span className='font-bold mr-4'>{t.project.box.time} :</span>{databox.time}</p>
                        <p><span className='font-bold mr-4'>{t.project.box.teamSize} :</span> {databox.teamSize}</p>
                    </div>
                    <div className='md:w-2/3'>
                        <p className='font-bold'>{t.project.box.technology} :</p>
                        <ul className='list-disc list-inside ml-5'>
                            <li><span>BE :</span> {databox.tech.BE}</li>
                            <li><span>FE :</span> {databox.tech.FE}</li>
                            <li><span>DB :</span> {databox.tech.DB}</li>
                        </ul>
                    </div>
                </div>
                <p><span className='font-bold mr-4'>{t.project.box.acount} :</span> {databox.acount.tk} - {databox.acount.mk}</p>
                <p><span className='font-bold mr-4'>{t.project.box.des} :</span> {databox.des}</p>
            </div>
            <div className='w-1/3'>
                <IframeWeb url={databox.url}/>
            </div>
            </div>}
            
        </Card>
    );
}
export default BoxProject;