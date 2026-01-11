import { Button } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
function ButtonLink({url, title, icon, type,tab}) {
    return (
        <Button type={type || "default"} target={tab ? "_blank" : undefined} rel={tab ?"noopener noreferrer": undefined}>
        <NavLink to={url}>
            {title}
            {icon && <span className="ml-2">{icon}</span>}
        </NavLink>
            
        </Button>
    );
}

export default ButtonLink;