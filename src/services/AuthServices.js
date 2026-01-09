import axiosInstance from "../config/axiosConfig";
import { jwtDecode } from 'jwt-decode';
import API_ROUTES from "../config/APIRoutes";
import {
  saveAuthToken,
  saveUserDataFromToken
} from "../Utils/authenticationUtils.js";
import  errorsString from "../Utils/errorsString";
export const loginApi = async (email, password) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.Login, {
            email,
            password,
        });
            const token = response.data.token;
            if(token){
                try {
                    saveAuthToken(token);
                    // saveRefreshToken(response.data.refreshToken);
            const decodedToken = jwtDecode(token);
            saveUserDataFromToken(decodedToken);
                } catch {
                    return {message: "Invalid token"}
                }
            }else{
                return {message: "Invalid token"}
            }
        
        return {
            success: true,
            message: "Đăng nhập thành công",
        }
    } catch(errors) {
        if(errors.response){
             if(errors.response.data.status===404){
            return {
                success: true,
                message: "Tài khoản bạn đã bị khóa",
            }
        }else if (errors.response.data.status===400){
            
            return {
                success: false,
                message: errorsString(errors.response.data.errors),
            }

        }else{
            // console.log(errors.response.data);   
            
            return {
                success: false,
                message:errorsString(errors.response.data.message) || 'Lỗi khi đăng nhập',
            }
        }
    }
        else{
            setTimeout(() => {
                return {
                success: false,
                message:'lỗi chưa kết nối server hoặc mạng không ổn định',
            }
            }, 5000)
            
        }
}
}

export const LogoutApi = async (userID) => {
    // console.log("id",userID);
    
    try {
        await axiosInstance.post(`${API_ROUTES.Logout}/${userID}`);
        return {
            success: true,
            message: "Đăng xuat thanh cong",
        }
    } catch  {
        return {
            success: false,
            message: "Lỗi khi đăng xuat",
        }
    }
}