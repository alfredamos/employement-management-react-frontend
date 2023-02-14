import { Link, useNavigate } from "react-router-dom";
import { EmployeeDto as Employee } from "../models/employees/employee.model";
import { UserType } from "../models/user-type";
import { useState, useEffect } from "react";
import { AuthUserRxJs } from '../store/auth-rxjs.store';

interface SingleEmployeeViewProp {
  employee: Employee;
}

export const SingleEmployeeView = ({ employee }: SingleEmployeeViewProp) => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    AuthUserRxJs.authUser$.subscribe(authUser => {
      const isAnAdmin = authUser.userType === UserType.Admin;
      setIsAdmin(isAnAdmin);
    });
  },[]);

  const deleteEmployeeHandler = (id: string) => {
    navigate(`/delete-employee/${id}`);
  }

  return (
    <>
      <td>
        <Link
          to={`/employee-detail/${employee?.id}`}
          style={{ textDecoration: "none" }}
        >
          {employee.fullName}
        </Link>
      </td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>{employee.gender}</td>
      <td>{employee.dateOfBirth?.toString()?.substring(0, 10)}</td>
      <td>{employee.department?.name}</td>
      <>
        {isAdmin && (
          <td>           
            <button
              className="btn btn-outline-danger m-1"
              onClick={() => deleteEmployeeHandler(employee.id)}
            >
              Delete
            </button>
          </td>
        )}
      </>
    </>
  );
};
