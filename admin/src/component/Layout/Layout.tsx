import React from "react";
import Header from "./Header";

const Layout = (props: {
    children: React.ReactNode;
}) => {
    return(
        <div>
            <Header />
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default Layout;

// TODO : 레이아웃 - 헤더 => 로그인 되어 있을 경우에만 헤더 띄우도록 설정하기