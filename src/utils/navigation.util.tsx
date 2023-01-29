import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context.store";
import "./navigation.util.css";

export const NavigationBar = () => {
  const authContext = useContext(AuthContext);

  return (
    <ul
      className="nav justify-content-end mb-2"
      style={{ backgroundColor: "#FFEDD1" }}
    >
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/departments"
        >
          Departments
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/"
        >
          Employees
        </NavLink>
      </li>
      {!authContext.authUser?.isLoggedIn && (
        <>
          <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>
          </li>
        </>
      )}
      {authContext.authUser?.isLoggedIn && (
        <>
          <li className="nav-item">
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Logout
            </NavLink>
          </li>
        </>
      )}
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link" : "nav-link"
          }
          to="/"
        >
          {authContext.authUser?.name}
        </NavLink>
      </li>
    </ul>
  );
};
