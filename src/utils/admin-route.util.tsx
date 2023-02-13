import React from "react";
import { Navigate } from "react-router-dom";

interface AdminRouteProp{
    isAdmin: boolean;
    children: React.ReactNode;
}

export const AdminRoute = ({isAdmin, children}: AdminRouteProp) => {
    if(!isAdmin)return <Navigate to="/home" replace/>
    return (
        <>{children}</>
    );
}