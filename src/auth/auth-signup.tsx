import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/axios-jwt-token.util";
import { EmployeeSignupDto } from "../models/auth/employee-signup.model";
import { EmployeeSignup } from "../forms/auth/employee-signup.form";
import { DepartmentDto as Department } from "../models/departments/department.model";
import { Gender } from "../models/gender";

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
      const response = await Axios.get(departmentUrl);
      const data: Department[] = response.data;
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
    const response = await Axios.post(signupUrl, signupInput);
    const data: EmployeeSignupDto = response.data;
    setEmployee(data);
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
