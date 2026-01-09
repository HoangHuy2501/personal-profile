import React from 'react';
import { useLanguage } from "../hook/useLanguage";
function Test() {
    const { t} = useLanguage();
    return (
        <div>
            <h1>{t.test.success.title}</h1>
        </div>
    );
}

export default Test;