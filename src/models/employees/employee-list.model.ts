import { Gender } from "../gender";
import {CreateDepartmentDto as Department} from "../departments/create-department.model"

export interface EmployeeListDto {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  password: string;
  confirmPassword: string;
  department: Department;
}
