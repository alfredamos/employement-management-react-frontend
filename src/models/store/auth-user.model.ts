import { UserType } from "../user-type";


export interface AuthUser{
    id?: string;
    name?: string;
    userType?: UserType;
    isLoggedIn: boolean;
}