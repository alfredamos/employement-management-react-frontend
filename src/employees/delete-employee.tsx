import { useState, useEffect, useContext } from "react";
import { EmployeeDelete as Employee } from "../models/employees/employee-delete";
import Axios from "../utils/axios-jwt-token.util";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../store/auth-context.store";
import { UserType } from "../models/user-type";

const baseUrl: string = "http://localhost:3100/api/employees";

export const DeleteEmployee = () => {
  const [employee, setEmployee] = useState({} as Employee);
  const navigate = useNavigate();
  const {id} =  useParams();
  const authContext = useContext(AuthContext);

  const url = `${baseUrl}/${id}`;

  useEffect(() => {
    const getEmployee = async () => {
      const response = await Axios.get(url);
      const data: Employee = response.data;
      setEmployee(data);
    };
    getEmployee();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backHandler = () => {
    navigate('/');
  }

  const deleteHandler = async (id: string) => {
    await Axios.delete(url);
    navigate('/');
  }

  return (
    <div
      className="border"
      style={{ margin: "50px auto", width: "75%", padding: "10px" }}
    >
      {authContext?.authUser?.isLoggedIn && authContext?.authUser?.userType === UserType.Admin ?
      (
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
              onClick={backHandler}
              className="btn btn-outline-secondary form-control m-1"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => deleteHandler(employee.id)}
              className="btn btn-outline-danger form-control m-1"
            >
              Delete
            </button>
          </li>
        </ul>
      ) : (
        <h4 className="text-center">You are not permitted to perform this task!</h4>
      )}
    </div>
  );
};
