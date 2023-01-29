import { CreateDepartmentDto } from "./create-department.model";

export interface DeleteDepartmentDto extends CreateDepartmentDto{
    id: string;
}