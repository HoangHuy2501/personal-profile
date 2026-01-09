import { Button } from 'antd';
import React from 'react';

function ButtonLink({url, title, onClick, icon, type}) {
    return (
        <Button href={url} onClick={onClick} type={type || "default"}>
            {title}
            {icon && <span className="ml-2">{icon}</span>}
        </Button>
    );
}

export default ButtonLink;