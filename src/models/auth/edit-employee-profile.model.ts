import { DepartmentDto as Department} from "../departments/department.model";
import { Gender } from "../gender";

export interface EditEmployeeProfileDto {
  id:string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  password: string;  
  newPassword: string;  
  departmentId: string;
  department?: Department
}
