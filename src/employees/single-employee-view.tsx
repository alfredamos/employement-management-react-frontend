import { Link } from "react-router-dom";
import { EmployeeListDto as Employee } from "../models/employees/employee-list.model";
import { UserType } from "../models/user-type";
import { AuthContext } from "../store/auth-context.store";
import { useContext } from "react";

interface SingleEmployeeViewProp {
  employee: Employee;
}

export const SingleEmployeeView = ({ employee }: SingleEmployeeViewProp) => {
  const authContext = useContext(AuthContext);

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
        {authContext?.authUser?.userType === UserType.Admin && (
          <td>
            <Link
              className="btn btn-outline-danger m-1"
              to={`/delete-employee/${employee?.id}`}
            >
              Delete
            </Link>
          </td>
        )}
      </>
    </>
  );
};
