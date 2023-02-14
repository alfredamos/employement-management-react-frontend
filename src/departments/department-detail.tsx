import { useState, useEffect} from "react";
import { DeleteDepartmentDto as Department } from "../models/departments/delete-department.model";
import { useNavigate, useParams } from "react-router-dom";
import { UserType } from "../models/user-type";
import { AuthUserRxJs } from "../store/auth-rxjs.store";
import { AuthUser } from "../models/store/auth-user.model";
import {departmentService} from "../services/department.service";
import { useObservable } from '../utils/use-observable.util';

const baseUrl = "departments";

export const DepartmentDetail = () => {
  const authUser = useObservable(AuthUserRxJs.authUser$, {} as AuthUser);
  const [department, setDepartment] = useState({} as Department);
  const navigate = useNavigate();
  const { id } = useParams();

  const url = `${baseUrl}/${id}`;
  const roles = ['Admin', 'Management', 'Staff'];

  useEffect(() => {
    const getDepartment = async () => {    
      const data = await departmentService.findOne(url);
      setDepartment(data);
    };
    getDepartment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const backHandler = () => {
    navigate("/departments");
  };

  const matchRoles = (roles: string[], userType: UserType) => {
    return roles.includes(userType);
  }

  return (
    <div
      className="border"
      style={{ margin: "50px auto", width: "75%", padding: "10px" }}
    >
      {authUser?.isLoggedIn &&
      matchRoles(roles, authUser?.userType!) ? (
        <ul className="list-group">
          <li className="list-group-item">Name: {department.name}</li>
          <li className="list-group-item">
            <button
              onClick={backHandler}
              className="btn btn-outline-secondary form-control"
              type="button"
            >
              Back
            </button>
          </li>
        </ul>
      ) : (
        <h4 className="text-center">
          You are not permitted to view this resource!
        </h4>
      )}
    </div>
  );
};
