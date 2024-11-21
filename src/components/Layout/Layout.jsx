import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { AppBar } from "../AppBar/AppBar";
import { Spinner } from "../Spinner/Spinner";


export const Layout = ({ children }) => {
  return (
    <div>
        <AppBar />
        <Suspense fallback={<Spinner />}>{children}</Suspense>
        <Outlet />
    </div>
  );
};

