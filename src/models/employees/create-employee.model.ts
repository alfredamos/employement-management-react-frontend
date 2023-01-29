import { Gender } from "../gender";

export interface CreateEmployee {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  password: string;
  confirmPassword: string;
  departmentId: string;
}
