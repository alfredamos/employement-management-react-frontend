import { useState, useEffect, useContext } from "react";
import { DeleteDepartmentDto as Department} from "../models/departments/delete-department.model";
import Axios from "../utils/axios-jwt-token.util";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../store/auth-context.store";
import { UserType } from "../models/user-type";

const baseUrl: string = "departments";

export const DeleteDepartment = () => {
  const [department, setDepartment] = useState({} as Department);
  const navigate = useNavigate();
  const { id } = useParams();
  const authContext = useContext(AuthContext)

  const url = `${baseUrl}/${id}`;

  useEffect(() => {
     const getDepartment = async () => {
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

  const deleteHandler = async (id: string) => {
    await Axios.delete(url);
    navigate("/departments");
  };

  return (
   <div
      className="border"
      style={{ margin: "50px auto", width: "75%", padding: "10px" }}
    >
    {
      authContext?.authUser?.isLoggedIn && authContext?.authUser?.userType === UserType.Admin ?
    (<ul className="list-group">
      <li className="list-group-item">FullName: {department.name}</li>      
      <li className="list-group-item">
        <button type="button" onClick={backHandler} className="btn btn-outline-secondary form-control m-1">
          Back
        </button>
        <>
        {authContext?.authUser?.userType === UserType.Admin && (
        <button
          onClick={() => deleteHandler(department.id)}
          className="btn btn-outline-danger form-control m-1"
          type="button"
        >
          Delete
        </button>
         )}
            </>
      </li>
    </ul>)
    :
    (<h4 className="text-center">You are not allowed to perform this task.!</h4>)
}
</div>
  );
};
