import { DataService } from "./data.service";
import { EmployeeChangePasswordDto } from '../models/auth/employee-change-password.model';
import { EmployeeLoginDto } from "../models/auth/employee-login.model";
import { EditEmployeeProfileDto } from "../models/auth/edit-employee-profile.model";
import { EmployeeSignupDto } from "../models/auth/employee-signup.model";
import { EmployeeInfo } from "../models/employees/employee-info.model";

type authDto =
  | EmployeeChangePasswordDto
  | EditEmployeeProfileDto
  | EmployeeLoginDto
  | EmployeeSignupDto
  | EmployeeInfo;

class AuthService extends DataService<authDto, string> {}

export const authService = new AuthService();