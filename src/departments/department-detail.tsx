import { useState, useEffect, useContext } from "react";
import { DeleteDepartmentDto as Department } from "../models/departments/delete-department.model";
import Axios from "../utils/axios-jwt-token.util";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../store/auth-context.store";
import { UserType } from "../models/user-type";

const baseUrl = "departments";

export const DepartmentDetail = () => {
  const [department, setDepartment] = useState({} as Department);
  const navigate = useNavigate();
  const { id } = useParams();
  const authContext = useContext(AuthContext);

  const url = `${baseUrl}/${id}`;
  const roles = ['Admin', 'Management', 'Staff'];

  useEffect(() => {
    const getDepartment = async () => {
      console.log({url});
      
      const response = await Axios.get(url);
      const data: Department = response.data;
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
      {authContext?.authUser?.isLoggedIn &&
      matchRoles(roles, authContext?.authUser.userType!) ? (
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
