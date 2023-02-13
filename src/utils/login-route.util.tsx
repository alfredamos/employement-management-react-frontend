import React from "react";
import { Navigate } from "react-router-dom";

interface LoginRouteProp{
    isLoggedIn: boolean;
    children: React.ReactNode;
}


export const LoginRoute = ({ isLoggedIn, children }: LoginRouteProp) => {
    if (!isLoggedIn) {
        return <Navigate to="/home" replace />;
    }
    return (
        <>{children}</>
    );
};