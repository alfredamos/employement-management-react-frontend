import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeSignupDto } from "../models/auth/employee-signup.model";
import { EmployeeSignup } from "../forms/auth/employee-signup.form";
import { DepartmentDto as Department } from "../models/departments/department.model";
import { Gender } from "../models/gender";
import { departmentService } from "../services/department.service";
import { authService } from "../services/auth.service";

const initialEmployee: EmployeeSignupDto = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: Gender.Male,
  password: "",
  confirmPassword: "",
  departmentId: "",
};

export const AuthSignup = () => {
  const [employee, setEmployee] = useState(initialEmployee);
  const [departments, setDepartments] = useState([] as Department[]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signupUrl = "auth/signup";
  const departmentUrl = "departments";

  useEffect(() => {
    const getDepartment = async () => {
      const data = await departmentService.findAll(departmentUrl);
      setDepartments(data);
      setIsLoading(true);
    };
    getDepartment();
  }, []);

  const backToListHandler = () => {
    navigate("/");
  };

  const employeeSignupSubmit = async (signupInput: EmployeeSignupDto) => {
    console.log({ signupInput });
    const data = await authService.create(signupInput, signupUrl);
    setEmployee(data as EmployeeSignupDto);
    console.log({ data });
    navigate("/");
  };

  return (
    <>
      {isLoading && (
        <EmployeeSignup
          employeeInitial={employee}
          backToListHandler={backToListHandler}
          departments={departments}
          onEmployeeSignupSubmit={employeeSignupSubmit}
        />
      )}
    </>
  );
};
