import { useState, useEffect} from "react";
import { DeleteDepartmentDto as Department } from "../models/departments/delete-department.model";
import Axios from "../utils/axios-jwt-token.util";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteItem } from "../utils/delete-item.util";
import {DisplayDeleteItem} from "./display-delete-item";
import { AuthUserRxJs } from "../store/auth-rxjs.store";
import { AuthUser } from "../models/store/auth-user.model";

const baseUrl: string = "departments";

export const DeleteDepartment = () => {
  const [authUser, setAuthUser] = useState({} as AuthUser);
  const [department, setDepartment] = useState({} as Department);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteTitle, setDeleteTitle] = useState("");
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const url = `${baseUrl}/${id}`;

  console.log("In delete, showDeleteItem :  ", showDeleteItem);
  console.log("In delete, isLoading :  ", isLoading);

  useEffect(() => {
    AuthUserRxJs.authUser$.subscribe(authUser => {
      setAuthUser(authUser);
    })
  })

  useEffect(() => {
    const getDepartment = async () => {
      const response = await Axios.get(url);
      const data: Department = response.data;
      setDepartment(data);
      setIsLoading(false);
    };
    getDepartment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backToListHandler = () => {
    navigate("/departments");
  };

  const deleteHandler = async (value: boolean) => {
    if (value) {
      await Axios.delete(url);
      navigate("/departments");
    } else {
      navigate("/departments");
    }
  };

  const deleteClick = () => {
    setDeleteMessage(`Do you want to delete department : ${department.name}?`);
    setDeleteTitle("Department delete confirmation!");
    setShowDeleteItem(!showDeleteItem);
  };

  return (
    <>
    {
      !isLoading ?  
      <> 
        <DisplayDeleteItem
          authUser={authUser}
          department={department}
          backToListHandler={backToListHandler}
          deleteClick={deleteClick}
          showDeleteItem={showDeleteItem}
        />
        <DeleteItem
          deleteItem={deleteHandler}
          deleteMessage={deleteMessage}
          deleteTitle={deleteTitle}
          cancelButton="Cancel"
          submitButton="Delete"
          showDeleteItem={showDeleteItem}
        />
        </>
        :(
          <div>Loading....</div>
        )    
}
    </>
  );
};
