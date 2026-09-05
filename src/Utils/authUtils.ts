/**
 * Các tiện ích xử lý xác thực và quản lý token
 * File này chứa các hàm để quản lý token, xác thực người dùng và thông tin người dùng
 */

const Languge='language';
const LightDark='lightdark';

// lưu ngôn ngữ vào localStorage
export const saveLanguage = (language) => {
   if (typeof window === 'undefined') return language;
   localStorage.setItem(Languge, language);
   return language;
};
// lưu light-dark vào localStorage
export const saveLightDark = (lightdark) => {
   if (typeof window === 'undefined') return lightdark;
   localStorage.setItem(LightDark, lightdark);
   return lightdark;
};
// Lấy ngôn ngữ từ localStorage
export const getLanguage = () => {
   if (typeof window === 'undefined') return null;
   return localStorage.getItem(Languge);
};
// Lấy light-dark từ localStorage
export const getLightDark = () => {
   if (typeof window === 'undefined') return null;
   return localStorage.getItem(LightDark);
};
// xóa light-dark khỏi localStorage
export const removeLightDark = () => {
   if (typeof window === 'undefined') return;
   localStorage.removeItem(LightDark);
};
