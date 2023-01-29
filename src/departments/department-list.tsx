import { useState, useEffect, useContext } from "react";
import { DepartmentDto } from "../models/departments/department.model";
import Axios from "../utils/axios-jwt-token.util";
import { AuthContext } from "../store/auth-context.store";
import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../models/user-type";

export const DepartmentList = () => {
  const [departments, setDepartments] = useState([] as DepartmentDto[]);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const departmentsUrl = "departments";
  const roles = ['Admin', 'Management', 'Staff'];

  useEffect(() => {
    const getAllDepartments = async () => {
      const data = await Axios.get(departmentsUrl);
      const response: DepartmentDto[] = data.data;
      setDepartments(response);
    };

    getAllDepartments();
  }, []);

  const addDepartmentHandler = () => {
    navigate("/create-department");
  };

  const matchRoles = (roles: string[], userType: UserType) => {
    return roles.includes(userType);
  };

  return (
    <div className="border" style={{ padding: "10px" }}>
      <div className="card">
        <>
          {authContext?.authUser?.isLoggedIn && (
            <div className="card-header">
              <h4 className="text-center">List of Departments</h4>
            </div>
          )}
        </>
        <div className="card-body">
          <>
            {authContext?.authUser?.isLoggedIn &&
            matchRoles(roles, authContext?.authUser.userType!) ? (
              <table className="table responsive striped bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <>
                      {authContext?.authUser?.userType === UserType.Admin && (
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
                        {authContext?.authUser?.userType === UserType.Admin && (
                          <td>
                            <Link
                              className="btn btn-outline-success m-1"
                              to={`/edit-department/${department.id}`}
                            >
                              Edit
                            </Link>

                            <Link
                              className="btn btn-outline-danger m-1"
                              to={`/delete-department/${department.id}`}
                            >
                              Delete
                            </Link>
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
            {authContext?.authUser?.isLoggedIn &&
              authContext?.authUser?.userType === UserType.Admin && (
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
