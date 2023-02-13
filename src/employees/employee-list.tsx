import { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "../utils/axios-jwt-token.util";
import { EmployeeListDto as Employee } from "../models/employees/employee-list.model";
import { SingleEmployeeView } from "./single-employee-view";
import { UserType } from "../models/user-type";
import { AuthUserRxJs } from "../store/auth-rxjs.store";
import { AuthUser } from "../models/store/auth-user.model";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([] as Employee[]);
  const [authUser, setAuthUser] = useState({} as AuthUser)
  

  const navigate = useNavigate();

  const url = "employees";
  const roles = ["Admin", "Management", "Staff"];

  useEffect(() => {
    AuthUserRxJs.authUser$.subscribe(setAuthUser);
  }, []);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await Axios(url);
        const data: Employee[] = response.data;
        setEmployees(data);
      } catch (err: any) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        console.log("error Message: ", err.message);
      }
    };

    getEmployees();
  }, []);

  const addEmployeeHandler = () => {
    navigate("/signup");
  };

  const isAdmin =() => {
    return authUser.userType === UserType.Admin;
  }

  const matchRoles = (roles: string[], userType: UserType) => {
    return roles.includes(userType);
  };

  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <>
          {authUser?.isLoggedIn && (
            <div className="card-header">
              <h4 className="text-center">List of Employees</h4>
            </div>
          )}
        </>
        <div className="card-body">
          <>
            {authUser?.isLoggedIn &&
            matchRoles(roles, authUser.userType!) ? (
              <table className="table table-responsive table-striped table-border">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Birth Date</th>
                    <th>Department</th>
                    <>
                      {isAdmin() && (
                        <th>Actions</th>
                      )}
                    </>
                  </tr>
                </thead>
                <tbody>
                  {employees?.map((employee) => (
                    <tr key={employee.id}>
                      <SingleEmployeeView employee={employee} />
                    </tr>
                  ))}
                  <tr></tr>
                </tbody>
              </table>
            ) : (
              <h4 className="text-center">
                You have to log in first,{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  please log in!
                </Link>                
              </h4>
            )}
          </>
        </div>
        <>
          {isAdmin() && (
            <div className="card-footer">
              <>
                {authUser?.isLoggedIn && (
                  <button
                    className="btn btn-outline-secondary form-control"
                    type="button"
                    onClick={addEmployeeHandler}
                  >
                    Add Employee
                  </button>
                )}
              </>
            </div>
          )}
        </>
      </div>
    </div>
  );
};
