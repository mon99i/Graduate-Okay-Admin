export interface LoginResponse {
  message: string;
  tokenInfo: {
    accessToken: string;
    refereshToken: string;
  };
}

export const submitLoginQuery = async (loginId: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const adminId = process.env.REACT_APP_ADMIN_ID;
      const adminPw = process.env.REACT_APP_ADMIN_PW;
      if (loginId === adminId && password === adminPw) {
        resolve({
          message: '로그인 성공',
          tokenInfo: {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
          },
        });
      } else {
        reject(new Error('로그인 실패'));
      }
    }, 1000);
  });
};

// 관리자 등록 후 새로운 관리자 등록 시 활용할 코드

// import axios from "axios";
// import api from "../apis/api";
// import { Cookies } from "react-cookie";

// export const submitLoginQuery = async (loginId: string, password: string) => {
//   const cookies = new Cookies();

//   await axios
//     .post(`${api.admin}/login`, {
//       loginId: loginId,
//       password: password,
//     })
//     .then((response) => {
//       localStorage.clear();
//       localStorage.setItem("loginId", response?.data.data.loginId);
//       localStorage.setItem("password", response?.data.data.password);
//       localStorage.setItem(
//         "refreshToken",
//         response?.data.data.tokenInfo.refreshToken
//       );
//       cookies.set("accessToken", response?.data.data.tokenInfo.accessToken, {
//         path: "/",
//       });
//     });
// };
