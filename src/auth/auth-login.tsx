import { useState} from "react";
import { EmployeeInfo } from "../models/employees/employee-info.model";
import { EmployeeLogin } from "../forms/auth/employee-login.form";
import { EmployeeLoginDto } from "../models/auth/employee-login.model";
import { useNavigate } from "react-router-dom";
import { AuthUserRxJs } from "../store/auth-rxjs.store";
import { authService } from "../services/auth.service";

const initialEmployee: EmployeeLoginDto = {
  email: "",
  password: "",
};

export const AuthLogin = () => {
  const [employee, setEmployee] = useState(initialEmployee);
  const navigate = useNavigate();

  const url = "auth/login";

  const backToListHandler = () => {
    navigate("/");
  };

  const employeeLoginSubmit = async (loginInput: EmployeeLoginDto) => {
    setEmployee(loginInput);
    
    const data = await authService.create(loginInput, url) as EmployeeInfo;

    AuthUserRxJs.getAuthUser$({
      id: data.id,
      name: data.fullName,
      userType: data.userType,
      isLoggedIn: true,
    });    

    localStorage.setItem("jwt", data.token);
    navigate("/");
  };

  return (
    <EmployeeLogin
      employeeInitial={employee}
      backToListHandler={backToListHandler}
      onEmployeeLoginSubmit={employeeLoginSubmit}
    />
  );
};
