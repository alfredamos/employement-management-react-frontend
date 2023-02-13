import { useState, useEffect } from "react";
import { EditEmployeeProfileDto as Employee } from "../models/auth/edit-employee-profile.model";
import { DepartmentDto as Department } from "../models/departments/department.model";
import Axios from "../utils/axios-jwt-token.util";
import { useNavigate } from "react-router-dom";
import { EditEmployeeProfile } from "../forms/auth/employee-edit-profile.form";

export const AuthEditProfile = () => {
  const [employee, setEmployee] = useState({} as Employee);
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([] as Department[]);

  const navigate = useNavigate();

  const url = "employees/current-user";

  const editEmployeeProfileUrl = "auth/edit-profile";

  const departmentUrl = "departments";

  useEffect(() => {
    const getDepartment = async () => {
      const response = await Axios.get(departmentUrl);
      const data: Department[] = response.data;
      setDepartments(data);
    };
    getDepartment();
  }, []);

  useEffect(() => {
    const getEmployee = async () => {
      const response = await Axios.get(url);
      const data: Employee = response.data;

      const employeeToEdit = getInitialEmployee(data);

      setEmployee(employeeToEdit!);
      setIsLoading(true);
    };
    getEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backToListHandler = () => {
    navigate("/");
  };

  const employeeEditProfileSubmit = async (editEmployeeProfile: Employee) => {
    console.log({ editEmployeeProfile });

    const response = await Axios.patch(
      editEmployeeProfileUrl,
      editEmployeeProfile
    );
    const data: Employee = response.data;
    setEmployee(data);
    navigate("/");
  };

  const getInitialEmployee = (employee: Employee) => {
    return {
      ...employee,
      dateOfBirth: employee.dateOfBirth.toString().substring(0, 10),
      password: "",
      newPassword: "",
      departmentId: employee?.department?.id,
    };
  };

  return (
    <>
      {isLoading && (
        <EditEmployeeProfile
          employeeInitial={employee}
          backToListHandler={backToListHandler}
          departments={departments}
          onEditEmployeeProfileSubmit={employeeEditProfileSubmit}
        />
      )}
    </>
  );
};
