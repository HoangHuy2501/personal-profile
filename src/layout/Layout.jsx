import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
function Layout() {
    return (
        <div>
        <Header />
            <div className='mt-16 pb-16'>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;