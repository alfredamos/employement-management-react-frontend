import { DataService } from "./data.service";
import {DepartmentDto} from "../models/departments/department.model";

class DepartmentService extends DataService<DepartmentDto, string>{}

export const departmentService = new DepartmentService();
