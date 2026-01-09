/**
 * Các tiện ích xử lý xác thực và quản lý token
 * File này chứa các hàm để quản lý token, xác thực người dùng và thông tin người dùng
 */

import { jwtDecode } from 'jwt-decode';
const Languge='language';
const LightDark='lightdark';

// lưu ngôn ngữ vào localStorage
export const saveLanguage = (language) => {
   localStorage.setItem(Languge, language);
   return language;
};
// lưu light-dark vào localStorage
export const saveLightDark = (lightdark) => {
   localStorage.setItem(LightDark, lightdark);
   return lightdark;
};
// Lấy ngôn ngữ từ localStorage
export const getLanguage = () => {
   return localStorage.getItem(Languge);
};
// Lấy light-dark từ localStorage
export const getLightDark = () => {
   return localStorage.getItem(LightDark);
};
// xóa light-dark khỏi localStorage
export const removeLightDark = () => {
   localStorage.removeItem(LightDark);
};