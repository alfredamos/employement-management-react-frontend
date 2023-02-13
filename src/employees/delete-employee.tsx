import { useState, useEffect} from "react";
import { EmployeeDto as Employee} from "../models/employees/employee.model";
import Axios from "../utils/axios-jwt-token.util";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteItem } from "../utils/delete-item.util";
import { DisplayDeleteItem } from "./display-delete-item";
import { AuthUserRxJs } from '../store/auth-rxjs.store';
import { AuthUser } from "../models/store/auth-user.model";

const baseUrl: string = "http://localhost:3100/api/employees";

export const DeleteEmployee = () => {
  const [authUser, setAuthUser] = useState({} as AuthUser);
  const [employee, setEmployee] = useState({} as Employee);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteTitle, setDeleteTitle] = useState("");
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const {id} =  useParams();  

  const url = `${baseUrl}/${id}`;

  useEffect(() => {
    AuthUserRxJs.authUser$.subscribe(setAuthUser);
  },[]);

  useEffect(() => {
    const getEmployee = async () => {
      const response = await Axios.get(url);
      const data: Employee = response.data;
      setEmployee(data);
      setIsLoading(false);
    };
    getEmployee();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backToListHandler = () => {
    navigate("/employees");
  };

  const deleteHandler = async (value: boolean) => {
    if (value) {
      await Axios.delete(url);
      navigate("/");
    } else {
      navigate("/");
    }
  };

  const deleteClick = () => {
    setDeleteMessage(`Do you want to delete employee : ${employee.fullName}?`);
    setDeleteTitle("Department delete confirmation!");
    setShowDeleteItem(!showDeleteItem);
  };

  return (
    <>
      {!isLoading ? (
        <>
          <DisplayDeleteItem
            authUser={authUser}
            employee={employee}
            backToListHandler={backToListHandler}
            deleteClick={deleteClick}
            showDeleteItem={showDeleteItem}
          />
          <DeleteItem
            deleteItem={deleteHandler}
            deleteMessage={deleteMessage}
            deleteTitle={deleteTitle}
            cancelButton="Cancel"
            submitButton="Submit"
            showDeleteItem={showDeleteItem}
          />
        </>
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
};
