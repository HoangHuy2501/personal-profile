import React, { useMemo } from 'react';
import { Image } from 'antd';
import wf from '../assets/image/avatar.jpg';
import {Card} from 'antd';
import {useLanguage} from '../hook/useLanguage';
import ButtonLink from '../components/customButton/ButtonLink.jsx';
import {ArrowRightOutlined,MailFilled } from '@ant-design/icons';
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiAntdesign } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { GrServices } from "react-icons/gr";
import TechSkill from '../components/Tech&Skill.jsx';
import {useRevealOnScroll} from '../hook/useRevealOnScroll.jsx';
function Home() {
    const { t } = useLanguage();
      const { ref, show } = useRevealOnScroll();
    const skill=useMemo(()=>[
        {
            id:1,
            name: "React",
            icon: <FaReact />,
            color: "#61DBFB"
        },{
            id:2,
            name: "NodeJS",
            icon: <FaNodeJs />,
            color: "#339933"
        },{
            id:3,
            name: "Tailwind",
            icon: <SiTailwindcss />,
            color: "#06B6D4"
        },{
            id:4,
            name: "Ant Design",
            icon: <SiAntdesign />,
            color: "#1890FF"
        },{
            id:5,
            name: "PostgreSQL",
            icon: <BiLogoPostgresql />,
            color: "#3B82F6"
        },{
            id:6,
            name: "Neon, Supabase",
            icon: <GrServices />,
            color: "#FF3E00"
        }
    ]);
    return (
        <div>
        <div className='w-40 h-40 mx-auto  rounded-full overflow-hidden border-[2px] border-black shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-all hover:animate-wiggle'>
                <Image
                src={wf}
                preview={false}
                className="w-full h-full object-cover"
            />
        </div>
        <div className='text-center mt-8'>
            <h1 className='text-xl md:text-3xl lg:text-5xl text-text-light dark:text-text-dark'>{t.info.hello}, {t.info.Iam} <span className='text-gradient'>{t.header.namedev}</span></h1>
            <p className='text-text-light dark:text-text-dark'>{t.info.des}</p>
            <p className='text-text-light dark:text-text-dark'>{t.info.expert}</p>
            <div className='flex justify-center gap-4 mt-6'>
                <ButtonLink url="/about" title={t.info.view_project} icon={<ArrowRightOutlined />} type="primary" className="mt-4"/>
                <ButtonLink url="/contact" title={t.info.contact} icon={<MailFilled />} className="mt-4"/>
            </div>
            <div className='mt-8'>
                {skill.map((item)=>(
                    <Card key={item.id} ref={ref} className={`inline-flex items-center gap-3 border dark:border-gray-600 rounded-full px-3 py-1 text-sm font-medium text-text-light dark:text-text-dark m-2 shadow-sm card-reveal ${show ? "show" : ""}`} style={{borderColor: item.color}} styles={{body:{padding:5}}}>
                        <span className='flex items-center gap-2'><span style={{color: item.color}}>{item.icon}</span> {item.name}</span>
                    </Card>
                ))}
            </div>
        </div>
        <div className='mt-20 px-4 pb-10'>
            <TechSkill />
        </div>
        </div>
    );
}

export default Home;