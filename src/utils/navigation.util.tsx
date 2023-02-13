import { Link, NavLink } from "react-router-dom";
import { useState, useEffect} from "react";
import "./navigation.util.css";
import { AuthUserRxJs } from "../store/auth-rxjs.store";
import { AuthUser } from "../models/store/auth-user.model";

export const NavigationBar = () => {
  const [authUser, setIsAuthUser] = useState({} as AuthUser)
  
  useEffect(() => {
    AuthUserRxJs.authUser$.subscribe(setIsAuthUser);
  }, []);

  console.log("In NavBar at point 1, authUser : ", authUser?.isLoggedIn);
    
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
      {!authUser?.isLoggedIn && (
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
      {authUser?.isLoggedIn && (
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
          <div className="dropdown">
            <Link
            style={{textDecoration: 'none'}}
              className="btn btn-link dropdown-toggle"
              to="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Settings
            </Link>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <NavLink className="dropdown-item" to="/change-password">
                  Change Password
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/edit-profile">
                  Edit profile
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      )}
    </ul>
  );
};
