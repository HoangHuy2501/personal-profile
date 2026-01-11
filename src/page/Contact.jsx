import React from 'react';
import {useLanguage} from '../hook/useLanguage';
import CardContact from '../components/contact/CardContact';
function Contact() {
    const { t } = useLanguage();
    return (
        <div >
            <div className='mx-auto w-2/3'>
                <h2 className='text-3xl text-text-light dark:text-text-dark font-bold'>{t.info.contact}</h2>
                <p className='text-gray-500 mb-16'>{t.info.des_contact}</p>
                <CardContact />
            </div>
            <div className="w-full md:w-3/4 md:h-[500px] h-[300px] mt-16 md:mx-auto">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4587.957779044791!2d108.16558811135214!3d16.059527339632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219185d37cb4f%3A0xd208a2b0e6bc4d2d!2zODAgVMO0IEhp4buHdSwgSG_DoCBNaW5oLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e1!3m2!1svi!2s!4v1768099817292!5m2!1svi!2s"
                className="w-full h-full border-0 rounded-xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
                />
            </div>
        </div>
    );
}

export default Contact;