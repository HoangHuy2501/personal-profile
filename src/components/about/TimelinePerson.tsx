"use client";
import React from "react";
import { useLanguage } from "../../hook/useLanguage";
import { timeline } from "../../lib/dataAbout";
function TimelinePerson() {
  const { t } = useLanguage();
  const dataTimeline = timeline(t);
  return (
    <div>
      {dataTimeline.map((item) => (
        <div
          key={item.id}
          className="timeline-item border-b border-gray-300 dark:border-slate-700 mt-10"
        >
          <p className="text-[#00a977] font-bold">// {item.classify}</p>
          <div className="border-l-2 border-[#00a977]/40 md:pl-10 pl-5 relative pb-8">
            <p className="text-[#00a977]">{item.time}</p>
            <div className="bg-[#00df8f] rounded-full w-2 h-2 absolute left-[-5px] top-1"></div>
            <h2 className="text-3xl text-text-light dark:text-text-dark">
              {item.title}
            </h2>
            {item.job ? (
              <div className="text-gray-500">
                <p>{item.job}</p>
                <p>{item.gpa}</p>
              </div>
            ) : (
              <div className="text-gray-500">
                <p>
                  <span className="font-bold text-text-light dark:text-text-dark mr-2">
                    {t.header.menu.project}:
                  </span>
                  {item.project}
                </p>
                <p>{item.address}</p>
                <p>{item.des}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimelinePerson;
