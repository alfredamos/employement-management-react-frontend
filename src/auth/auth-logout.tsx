import { useState } from "react";
import { AuthUserRxJs } from "../store/auth-rxjs.store";
import "./auth-logout.css";
import { Link, useNavigate } from "react-router-dom";
import { DeleteItem } from "../utils/delete-item.util";
import { UserType } from "../models/user-type";

export const AuthLogout = () => {
  const [logoOutMessage] = useState(`Do you want to logout?`);
  const [logoOutTitle] = useState("Logout confirmation!");
  const [showDeleteItem, setShowDeleteItem] = useState(true);

  const navigate = useNavigate();

  const logoutHandler = (value: boolean) => {
    if (value) {     
      AuthUserRxJs.getAuthUser$({
        id: "",
        name: "",
        userType: UserType.Staff,
        token: "",
        isLoggedIn: false,
      });
      localStorage.setItem("jwt", "");
      setShowDeleteItem(!showDeleteItem);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      {!showDeleteItem ? (
        <div className="border pado">
          <div className="card wita">
            <h4 className="text-center moba">
              <hr />
              You have successfully logged out!
              <hr />
              <>
                <Link className="rd-text" to="/login">
                  Do you have an account? Please log in!
                </Link>
              </>
              <hr />
              <>
                <Link className="rd-text" to="/signup">
                  You don't have an account? Please signup!
                </Link>
              </>
              <hr />
            </h4>
          </div>
        </div>
      ) : (
        <DeleteItem
          deleteItem={logoutHandler}
          deleteMessage={logoOutMessage}
          deleteTitle={logoOutTitle}
          cancelButton="Back"
          submitButton="Logout"
          showDeleteItem={showDeleteItem}
        />
      )}
    </>
  );
};
