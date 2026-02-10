import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
function Layout() {
    const [click, setClick] = useState(false);
    const handleClick=()=>{
        setClick(true);
        console.log("hihi");
        
    }
    useEffect(() => {
        if(click=== true){
            setClick(false);
        }
    }, [click]);
    return (
        <div>
        <div className='fixed top-0 w-full z-50'>
            <Header onclose={click}/>
        </div>
            <div className='pt-28 pb-16' onClick={handleClick}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;