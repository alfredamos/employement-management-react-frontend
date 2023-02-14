import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeChangePassword } from "../forms/auth/employee-change-password.form";
import { EmployeeChangePasswordDto } from '../models/auth/employee-change-password.model';
import { authService } from "../services/auth.service";

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
        const data = await authService.findOne(currentEmployeeUrl);
        console.log({ data });
        
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
    const data = await authService.edit(
      employeeChangePassword,
      changePasswordUrl
    );
    //const data: EmployeeChangePasswordDto = response.data;
    console.log({ data });

    setEmployeeChangePassword(data as EmployeeChangePasswordDto);
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
