import React from 'react';
import { Image } from 'antd';
import wf from '../assets/image/wf.png';
function Home() {
    return (
        <div className="bg-background-light dark:bg-background-dark pt-16">
        <div className='w-40 h-40 mx-auto  rounded-full overflow-hidden border-[2px] border-black shadow-[0_0_40px_rgba(168,85,247,0.8)] animate-wiggle'>
                <Image
                src={wf}
                preview={false}
                className="w-full h-full"
                imgStyle={{ objectFit: "cover" }}
            />
        </div>
        </div>
    );
}

export default Home;