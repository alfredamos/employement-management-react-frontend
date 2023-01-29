import { DepartmentDto as Department } from "../departments/department.model";
import { Gender } from "../gender";

export interface EmployeeDelete {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: Gender;
  department?: Department | null;
}
