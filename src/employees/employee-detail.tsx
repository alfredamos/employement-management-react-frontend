import { useState, useEffect} from "react";
import { EmployeeDto as Employee } from "../models/employees/employee.model";
import { useNavigate, useParams } from "react-router-dom";
import { UserType } from "../models/user-type";
import { AuthUser } from "../models/store/auth-user.model";
import { AuthUserRxJs } from '../store/auth-rxjs.store';
import { employeeService } from "../services/employee.service";
import { useObservable } from '../utils/use-observable.util';

const baseUrl: string = "http://localhost:3100/api/employees";

export const EmployeeDetail = () => {
  const authUser = useObservable(AuthUserRxJs.authUser$, {} as AuthUser);
  const [employee, setEmployee] = useState({} as Employee);
  const navigate = useNavigate();
  const { id } = useParams();

  const url = `${baseUrl}/${id}`;
  const roles = ['Admin', 'Management', 'Staff'];

  useEffect(() => {
    const getEmployee = async () => {
      const data = await employeeService.findOne(url);
      setEmployee(data);
    };

    getEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backToListHandler = () => {
    navigate("/");
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
      matchRoles(roles, authUser.userType!) ? (
        <ul className="list-group">
          <li className="list-group-item text-center">
            FullName: {employee?.fullName}
          </li>
          <li className="list-group-item text-center">
            Email: {employee?.email}
          </li>
          <li className="list-group-item text-center">
            Phone: {employee?.phone}
          </li>
          <li className="list-group-item text-center">
            Birth date: {employee?.dateOfBirth?.toString()?.substring(0, 10)}
          </li>
          <li className="list-group-item text-center">
            Gender: {employee?.gender}
          </li>
          <li className="list-group-item text-center">
            Department: {employee?.department?.name}
          </li>
          <li className="list-group-item text-center">
            <button
              type="button"
              onClick={backToListHandler}
              className="btn btn-outline-secondary form-control m-1"
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
