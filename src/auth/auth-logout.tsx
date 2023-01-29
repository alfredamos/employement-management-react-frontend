import { useContext } from "react";
import { AuthContext } from "../store/auth-context.store";
import { UserType } from "../models/user-type";
import { useNavigate } from "react-router-dom";
import "./auth-logout.css";

export const AuthLogout = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.setItem("jwt", JSON.stringify(""));
    authContext.setAuthUser({
      id: "",
      name: "",
      userType: UserType.Staff,
      isLoggedIn: false,
    });
  };

  const loginHandler = () => {
    navigate("/login");
  };

  const signupHandler = () => {
    navigate("/signup");
  };

  return (
    <>
      <div
        className="border"
        style={{
          height: "80vh",
          width: "50%",
          margin: "auto",
          padding: "10px",
        }}
      >
        <div className="card" style={{ height: "76vh" }}>
          <>
            {!authContext.authUser.isLoggedIn && (
              <>
                <div className="card-header">
                  <h4 className="text-center">Log out Confirmation!</h4>
                </div>
                <div className="card-body">
                  <h4 className="text-center text-align">
                    You have logged out successfully!
                  </h4>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-outline-primary form-control m-1"
                    onClick={loginHandler}
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-outline-secondary form-control m-1"
                    onClick={signupHandler}
                  >
                    Signup
                  </button>
                </div>
              </>
            )}
          </>
          <>
            {authContext.authUser.isLoggedIn && (
              <>
                <div className="card-header">
                  <h4 className="text-center">Do you want to Log out?</h4>
                </div>
                <div className="card-body">
                  <h4 className="text-center">
                    Click the button below to log out!
                  </h4>
                </div>
                <div className="card-footer">
                  <button
                    type="button"
                    className="btn btn-outline-dark form-control"
                    onClick={logoutHandler}
                  >
                    Log Out
                  </button>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};
