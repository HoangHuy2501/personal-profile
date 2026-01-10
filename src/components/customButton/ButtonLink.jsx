import { Button } from 'antd';
import React from 'react';

function ButtonLink({url, title, icon, type,tab}) {
    return (
        <Button href={url} type={type || "default"} target={tab ? "_blank" : undefined} rel={tab ?"noopener noreferrer": undefined}>
            {title}
            {icon && <span className="ml-2">{icon}</span>}
        </Button>
    );
}

export default ButtonLink;