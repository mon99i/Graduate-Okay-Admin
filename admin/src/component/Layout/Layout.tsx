import React from "react";
import Header from "./Header";
import { useAuth } from "../../context/AuthContext";

const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn && <Header />}
      <main className="flex-grow flex items-center justify-center">
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
