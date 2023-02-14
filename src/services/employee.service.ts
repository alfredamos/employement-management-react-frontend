import { EmployeeDto } from "../models/employees/employee.model";
import {DataService} from "./data.service";

class EmployeeService extends DataService<EmployeeDto, string>{} 

export const employeeService = new EmployeeService();