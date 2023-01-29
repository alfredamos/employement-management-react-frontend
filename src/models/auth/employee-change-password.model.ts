export interface EmployeeChangePasswordDto{
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}