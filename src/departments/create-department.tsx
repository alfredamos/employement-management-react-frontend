import { useState} from "react";
import { DepartmentForm } from "../forms/departments/department.form";
import { DepartmentDto as Department } from "../models/departments/department.model";
import { useNavigate } from "react-router-dom";
import { UserType } from "../models/user-type";
import {departmentService} from "../services/department.service";
import { AuthUserRxJs } from "../store/auth-rxjs.store";
import { AuthUser } from "../models/store/auth-user.model";
import { useObservable } from "../utils/use-observable.util";

const departmentInitial: Department = {
  id: "" as string,
  name: "",
};

export const CreateDepartment = () => {  
  const authUser = useObservable<AuthUser>(
    AuthUserRxJs.authUser$,
    {} as AuthUser
  );
  const [department, setDepartment] = useState(departmentInitial);
  const navigate = useNavigate();

  const url = "departments"; 

  const backToListHandler = () => {
    navigate("/departments");
  };

  const departmentSubmitHandler = async (departmentInput: Department) => {
    console.log("departmentInput : ", departmentInput);
    const data = await departmentService.create(departmentInput, url);

    setDepartment(data);

    navigate("/departments");
  };

  const isAdmin = () => {
    return authUser?.userType === UserType.Admin;
  }

  return (
    <>
      {isAdmin() ? (
        <DepartmentForm
          departmentInitial={department}
          backToListHandler={backToListHandler}
          onDepartmentSubmit={departmentSubmitHandler}
        ></DepartmentForm>
      ) : (
        <div className="card" style={{padding: '20px'}}>
          <h4> You are not allowed to perform this task!</h4>
        </div>
      )}
    </>
  );
};
