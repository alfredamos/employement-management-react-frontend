import React, { createContext, useState } from "react";
import { AuthUser } from "../models/store/auth-user.model";
import { UserType } from "../models/user-type";

const initialAuthUser: AuthUser = {
  id: "",
  name: "",
  userType: UserType.Staff,
  isLoggedIn: false,
};

interface AuthContextType {
  authUser: AuthUser;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser>>;  
}

export const AuthContext = createContext(
  {} as AuthContextType
);

interface AuthContextProviderProp {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProp) => {
  const [authUser, setAuthUser] = useState(initialAuthUser);
  
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser}}>
      {children}
    </AuthContext.Provider>
  );
};
