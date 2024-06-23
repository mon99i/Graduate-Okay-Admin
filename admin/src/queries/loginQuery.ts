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
//       localStorage.setItem("id", response?.data.data.id);
//       localStorage.setItem("nickname", response?.data.data.nickname);
//       localStorage.setItem(
//         "refreshToken",
//         response?.data.data.tokenInfo.refreshToken
//       );
//       cookies.set("accessToken", response?.data.data.tokenInfo.accessToken, {
//         path: "/",
//       });
//     });
// };

export const submitLoginQuery = async (loginId: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (loginId === "admin" && password === "test") {
        resolve({ message: "로그인 성공" });
      } else {
        reject(new Error("로그인 실패"));
      }
    }, 1000);
  });
};
