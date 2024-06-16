// import { Suspense, lazy } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./index.css";
// import RouteChangeTracker from "./utils/routeChangeTracker";

// const Login = lazy(() => import("./Pages/Login"));

// function App() {
//   return (
//     <BrowserRouter>
//         <Suspense>
//           <Routes>
//             <Route path="/" element={<Login />} />
//           </Routes>
//         </Suspense>
//     </BrowserRouter>
//   );
// }

// export default App;

import Login from "./Pages/Login";

function App() {
    return (
        <div className="Login">
            <Login />
        </div>
    )
}

export default App;