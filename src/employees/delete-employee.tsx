import { useState, useEffect } from "react";
import { EmployeeDto as Employee } from "../models/employees/employee.model";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteItem } from "../utils/delete-item.util";
import { DisplayDeleteItem } from "./display-delete-item";
import { AuthUserRxJs } from "../store/auth-rxjs.store";
import { AuthUser } from "../models/store/auth-user.model";
import { employeeService } from "../services/employee.service";
import { useObservable } from '../utils/use-observable.util';

const baseUrl: string = "http://localhost:3100/api/employees";

export const DeleteEmployee = () => {
  const authUser = useObservable(AuthUserRxJs.authUser$, {} as AuthUser);
  const [employee, setEmployee] = useState({} as Employee);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteTitle, setDeleteTitle] = useState("");
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const url = `${baseUrl}/${id}`;

  useEffect(() => {    
    const getEmployee = async () => {
      const data = await employeeService.findOne(url);
      console.log("employee : ", data);
      setEmployee(data);
      setIsLoading(false);
    };

    getEmployee();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backToListHandler = () => {
    navigate("/");
  };

  const deleteHandler = async (value: boolean) => {
    if (value) {
      await employeeService.delete(url);
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
