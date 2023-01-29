import { useState, useEffect } from "react";
import Axios from "../utils/axios-jwt-token.util";
import { useNavigate } from "react-router-dom";
import { EmployeeChangePassword } from "../forms/auth/employee-change-password.form";
import { EmployeeChangePasswordDto } from "../models/auth/employee-change-password.model";
import { EmployeeInfo } from "../models/employees/employee-info.model";

const initialEmployee: EmployeeChangePasswordDto = {
  email: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const AuthChangePassword = () => {
  const [employeeChangePassword, setEmployeeChangePassword] =
    useState(initialEmployee); 
  const [error, setError] = useState("");
  

  const navigate = useNavigate();

  const changePasswordUrl = "auth/change-password";  
  const currentEmployeeUrl = "auth/profile";

  const backToListHandler = () => {
    navigate("/");
  };

  useEffect(() => {
    const getEmployeeProfile = async () => {
      try {
        const data = await Axios.get(currentEmployeeUrl);
        const response: EmployeeInfo = data.data;
        console.log({ response });
        
      } catch (err: any) {
        console.log(err);

        setError(err.message);
      }
    };
    getEmployeeProfile();
  }, []);

  const employeeChangePasswordSubmit = async (
    employeeChangePassword: EmployeeChangePasswordDto
  ) => {
    const response = await Axios.patch(
      changePasswordUrl,
      employeeChangePassword
    );
    const data: EmployeeChangePasswordDto = response.data;
    console.log({ data });

    setEmployeeChangePassword(data);
    navigate("/");
  };

  

  return (
    <>
    {
      !error &&
    <EmployeeChangePassword
      employeeInitial={employeeChangePassword}
      backToListHandler={backToListHandler}
      onChangePasswordSubmit={employeeChangePasswordSubmit}
    />
    }
    </>
  );
};
