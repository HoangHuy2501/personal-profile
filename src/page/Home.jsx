import React, { useMemo } from 'react';
import { Image } from 'antd';
import wf from '../assets/image/avatar.jpg';
import {useLanguage} from '../hook/useLanguage';
import ButtonLink from '../components/customButton/ButtonLink.jsx';
import {ArrowRightOutlined,MailOutlined } from '@ant-design/icons';
function Home() {
    const { t } = useLanguage();
    const skill=useMemo(()=>[
        {
            id:1,
            name: "React",
            icon: <ArrowRightOutlined />
        },{
            id:2,
            name: "NodeJS",
            icon: <MailOutlined />
        }
    ]);
    return (
        <div className="bg-background-light dark:bg-background-dark pt-16">
        <div className='w-40 h-40 mx-auto  rounded-full overflow-hidden border-[2px] border-black shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-all hover:animate-wiggle'>
                <Image
                src={wf}
                preview={false}
                className="w-full h-full object-cover"
                // imgStyle={{ objectFit: "cover" }}
            />
        </div>
        <div className='text-center mt-8'>
            <h1 className='text-xl md:text-3xl lg:text-5xl text-text-light dark:text-text-dark'>{t.info.hello}, {t.info.Iam} <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500'>{t.header.namedev}</span></h1>
            <p className='text-text-light dark:text-text-dark'>{t.info.des}</p>
            <p className='text-text-light dark:text-text-dark'>{t.info.expert}</p>
            <div className='flex justify-center gap-4 mt-6'>
                <ButtonLink url="/about" title={t.info.view_project} icon={<ArrowRightOutlined />} type="primary" className="mt-4"/>
                <ButtonLink url="/contact" title={t.info.contact}  className="mt-4"/>
            </div>
        </div>
        </div>
    );
}

export default Home;