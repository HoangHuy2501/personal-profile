import React from 'react';
import { Select } from 'antd';
import { useLanguage } from "../hook/useLanguage";
import { saveLanguage } from '../Utils/authUtils';
function ButtonLanguage() {
    const {t,setLang, lang} = useLanguage();
    const handleLanguage=(value) => {
        setLang(value);
        saveLanguage(value);
    }
    return (
        <div className='py-1'>
            <Select value={lang} onChange={handleLanguage} className="min-w-[110px]" variant="borderless">
                <Select.Option value="en-US">{t.language.Eng}</Select.Option>
                <Select.Option value="vi-VN">{t.language.Vie}</Select.Option>
            </Select>
        </div>
    );
}

export default ButtonLanguage;