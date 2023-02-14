import { useEffect, useState} from 'react';
import { DepartmentForm } from "../forms/departments/department.form";
import { DepartmentDto as Department } from "../models/departments/department.model";
import { useNavigate, useParams } from "react-router-dom";
import { UserType } from '../models/user-type';
import { AuthUser } from '../models/store/auth-user.model';
import { AuthUserRxJs } from '../store/auth-rxjs.store';
import {departmentService} from "../services/department.service";
import { useObservable } from '../utils/use-observable.util';

const departmentInitial: Department = {
  id: "",
  name: "",
};

export const EditDepartment = () => { 
  const authUser = useObservable(AuthUserRxJs.authUser$, {} as AuthUser); 
  const [department, setDepartment] = useState(departmentInitial);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  const {id} = useParams();

  const url = `departments/${id}`;

  console.log({url})

  useEffect(() => {    
    const getDepartment = async () => {     
      const data = await departmentService.findOne(url);
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
    //const response = await Axios.patch(url, departmentInput);
    //const data: Department = response.data;
    const data = await departmentService.edit(departmentInput, url);

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
