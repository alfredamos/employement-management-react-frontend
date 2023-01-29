import { CreateDepartmentDto } from "./create-department.model";

export interface EditDepartmentDto extends CreateDepartmentDto{
    id?: string;
}