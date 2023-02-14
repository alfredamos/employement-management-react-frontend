import { DepartmentDto as Department } from "../departments/department.model";
import { Gender } from "../gender";
import { UserType } from "../user-type";

export interface EmployeeDto {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: Gender;
  password: string;
  userType: UserType;
  department?: Department | null;
  departmentId?: string;
}
