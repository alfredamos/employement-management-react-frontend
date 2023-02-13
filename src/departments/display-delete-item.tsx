import { DepartmentDto } from "../models/departments/department.model";
import { AuthUser } from "../models/store/auth-user.model";
import { UserType } from "../models/user-type";

interface DisplayDeleteItemProp{
    authUser: AuthUser;
    department: DepartmentDto;
    showDeleteItem: boolean;
    backToListHandler: () => void;
    deleteClick: () => void;
}

export const DisplayDeleteItem = (props: DisplayDeleteItemProp) => {
  const {authUser, department, backToListHandler, deleteClick, showDeleteItem} = props;
  console.log("In DisplayDItem : ", showDeleteItem);  
  return (
        <>
        {
            !showDeleteItem &&
    <div
      className="border"
      style={{ margin: "50px auto", width: "75%", padding: "10px" }}
    >
      {authUser?.isLoggedIn && authUser?.userType === UserType.Admin ? (
        <ul className="list-group">
          <li className="list-group-item">FullName: {department.name}</li>
          <li className="list-group-item">
            <button
              type="button"
              onClick={backToListHandler}
              className="btn btn-outline-secondary form-control m-1"
            >
              Back
            </button>
            <>
              {authUser?.userType === UserType.Admin && (
                <button
                  onClick={deleteClick}
                  className="btn btn-outline-danger form-control m-1"
                  type="button"
                >
                  Delete
                </button>
              )}
            </>
          </li>
        </ul>
      ) : (
        <h4 className="text-center">
          You are not allowed to perform this task.!
        </h4>
      )}
    </div>
}
</>
  );
};