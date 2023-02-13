import { useEffect, useState} from 'react';
import { DepartmentForm } from "../forms/departments/department.form";
import { CreateDepartmentDto as Department } from "../models/departments/create-department.model";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../utils/axios-jwt-token.util";
import { UserType } from '../models/user-type';
import { AuthUser } from '../models/store/auth-user.model';
import { AuthUserRxJs } from '../store/auth-rxjs.store';

const departmentInitial: Department = {
  name: "",
};

export const EditDepartment = () => { 
  const [authUser, setAuthUser] = useState({} as AuthUser); 
  const [department, setDepartment] = useState(departmentInitial);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  const {id} = useParams();

  const url = `departments/${id}`;

  console.log({url})

  useEffect(() => {
    AuthUserRxJs.authUser$.subscribe(setAuthUser);    
  },[]);

  useEffect(() => {    
    const getDepartment = async () => {
      const response = await Axios.get(url);
      const data: Department = response.data;
      setIsLoading(false)
      setDepartment(data);
    };
    getDepartment();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const backToListHandler = () => {
    navigate("/departments");
  };

  const departmentSubmitHandler = async (departmentInput: Department) => {
    console.log("departmentInput : ", departmentInput);
    const response = await Axios.patch(url, departmentInput);
    const data: Department = response.data;

    setDepartment(data);
    navigate('/departments');
  };

  return (
    <>
      {!isLoading && authUser?.userType === UserType.Admin ? (
        <DepartmentForm
          departmentInitial={department}
          backToListHandler={backToListHandler}
          onDepartmentSubmit={departmentSubmitHandler}
        ></DepartmentForm>
      ) : (
        <div className="card" style={{ padding: "20px" }}>
          <h4> You are not allowed to perform this task!</h4>
        </div>
      )}
    </>
  );
};
