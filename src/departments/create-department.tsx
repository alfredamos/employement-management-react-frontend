import { useState, useContext } from "react";
import { DepartmentForm } from "../forms/departments/department.form";
import { CreateDepartmentDto as Department } from "../models/departments/create-department.model";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/axios-jwt-token.util";
import { AuthContext } from "../store/auth-context.store";
import { UserType } from "../models/user-type";

const departmentInitial: Department = {
  name: "",
};

export const CreateDepartment = () => {
  //departmentInitial, backToListHandler, onDepartmentSubmit
  const [department, setDepartment] = useState(departmentInitial);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const url = "departments";

  const backToListHandler = () => {
    navigate("/departments");
  };

  const departmentSubmitHandler = async (departmentInput: Department) => {
    console.log("departmentInput : ", departmentInput);
    const response = await Axios.post(url, departmentInput);
    const data: Department = response.data;

    setDepartment(data);

    navigate("/departments");
  };

  return (
    <>
      {authContext?.authUser?.userType === UserType.Admin ? (
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
