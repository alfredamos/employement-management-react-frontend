import { UserType } from "../user-type";

export interface EmployeeInfo{
    id: string;
    fullName: string;
    message?: string;
    token: string;
    userType: UserType;
    isLoggedIn?:boolean;
}