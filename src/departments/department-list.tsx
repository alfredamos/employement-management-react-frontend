import { useState, useEffect} from "react";
import { DepartmentDto } from "../models/departments/department.model";
import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../models/user-type";
import { AuthUserRxJs } from "../store/auth-rxjs.store";
import { AuthUser } from "../models/store/auth-user.model";
import {departmentService} from "../services/department.service";
import { useObservable } from '../utils/use-observable.util';

export const DepartmentList = () => {
  const [departments, setDepartments] = useState([] as DepartmentDto[]);
  const authUser = useObservable(AuthUserRxJs.authUser$, {} as AuthUser);  

  const navigate = useNavigate();

  const departmentsUrl = "departments";
  const roles = ['Admin', 'Management', 'Staff'];

  useEffect(() => {
    const getAllDepartments = async () => {
      const data = await departmentService.findAll(departmentsUrl);
      setDepartments(data);
    };

    getAllDepartments();
  }, []);

  const addDepartmentHandler = () => {
    navigate("/create-department");
  };

  const deleteDepartmentHandler = (id: string) => {
    console.log("in dept. list id : ", id);
     navigate(`/delete-department/${id}`);
  }

  const editDepartmentHandler = (id: string) => {
     navigate(`/edit-department/${id}`);
  }

  const isAdmin = () => {
    return authUser.userType === UserType.Admin;
  };

  const matchRoles = (roles: string[], userType: UserType) => {
    return roles.includes(userType);
  };

  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <>
          {authUser?.isLoggedIn && (
            <div className="card-header">
              <h4 className="text-center">List of Departments</h4>
            </div>
          )}
        </>
        <div className="card-body">
          <>
            {authUser?.isLoggedIn &&
            matchRoles(roles, authUser?.userType!) ? (
              <table className="table responsive striped bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <>
                      {isAdmin() && (
                        <th>Actions</th>
                      )}
                    </>
                  </tr>
                </thead>
                <tbody>
                  {departments?.map((department) => (
                    <tr key={department.id}>
                      <td>
                        <Link
                          to={`/department-detail/${department.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {department.name}
                        </Link>
                      </td>
                      <>
                        {isAdmin() && (
                          <td>
                            <button
                              className="btn btn-outline-success m-1"
                              onClick={() =>
                                editDepartmentHandler(department?.id)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-outline-danger m-1"
                              onClick={() =>
                                deleteDepartmentHandler(department.id)
                              }
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </>
                    </tr>
                  ))}
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
        <div className="card-footer">
          <>
            {authUser?.isLoggedIn &&
              isAdmin() && (
                <button
                  className="btn btn-outline-secondary form-control"
                  type="button"
                  onClick={addDepartmentHandler}
                >
                  Add Department
                </button>
              )}
          </>
        </div>
      </div>
    </div>
  );
};
