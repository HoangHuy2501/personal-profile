import React from "react";
import ImageBox from "../components/about/ImageBox";
import CardPerson from "../components/about/CardPerson";
import CardDev from "../components/about/CardDev";
import TimelinePerson from "../components/about/TimelinePerson";
import Hobbies from "../components/about/Hobbies";
import { useLanguage } from "../hook/useLanguage";
import ButtonLink from "../components/customButton/ButtonLink";
function About() {
    const { t } = useLanguage();
  return (
    <div className="md:flex  justify-center">
      <div className="md:w-1/3 md:px-14 md:block">
        <ImageBox />
        <CardPerson />
        <CardDev />
      </div>
      <div className="md:w-2/3 md:pr-20 px-3 mt-7">
        <div>
            <p className="text-[#8a2ce2] font-bold">// {t.personInfo.objective.classify}</p>
            <h1 className="text-text-light dark:text-text-dark">{t.personInfo.objective.title}</h1>
            <p className='text-gray-500'>{t.personInfo.objective.des1}</p>
            <p className='text-gray-500'>{t.personInfo.objective.des2}</p>
        </div>
        <TimelinePerson />
        <Hobbies />
        <div className="flex justify-end">
<ButtonLink url="https://github.com/HoangHuy2501" title={t.info.view_git} tab={true}/>
        </div>
      </div>
        
    </div>
  );
}

export default About;
