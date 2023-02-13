import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  //  Navigate,
} from "react-router-dom";
import { EmployeeList } from "./employees/employee-list";
import { DeleteEmployee } from "./employees/delete-employee";
import { EmployeeDetail } from "./employees/employee-detail";
import { DepartmentList } from "./departments/department-list";
import { CreateDepartment } from "./departments/create-department";
import { DeleteDepartment } from "./departments/delete-department";
import { EditDepartment } from "./departments/edit-department";
import { DepartmentDetail } from "./departments/department-detail";
import { AuthChangePassword } from "./auth/auth-change-password";
import { AuthEditProfile } from "./auth/auth-edit-profile";
import { AuthLogin } from "./auth/auth-login";
import { AuthSignup } from "./auth/auth-signup";
import { AuthLogout } from "./auth/auth-logout";
import { NavigationBar } from "./utils/navigation.util";
import { LoginRoute } from "./utils/login-route.util";
import { AdminRoute } from "./utils/admin-route.util";
import "./App.css";
import { UserType } from "./models/user-type";
import { Home } from "./utils/home.util";
import { AuthUser } from "./models/store/auth-user.model";
import { AuthUserRxJs } from "./store/auth-rxjs.store";

function App() {
  const [authUser, setAuthUser] = useState({} as AuthUser);

  useEffect(() => {
    AuthUserRxJs.authUser$.subscribe(setAuthUser); 
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  console.log("In App, isLoggedIn : ", authUser?.isLoggedIn);
  
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route
          path="/departments"
          element={
            <LoginRoute isLoggedIn={authUser?.isLoggedIn}>
              <DepartmentList />
            </LoginRoute>
          }
        ></Route>
        <Route
          path="/create-department"
          element={
            <AdminRoute isAdmin={authUser?.userType === UserType.Admin}>
              <CreateDepartment />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/delete-department/:id"
          element={
            <AdminRoute isAdmin={authUser?.userType === UserType.Admin}>
              <DeleteDepartment />
            </AdminRoute>
          }
        ></Route>
        <Route path="/edit-department/:id" element={<EditDepartment />}></Route>
        <Route
          path="/department-detail/:id"
          element={
            <AdminRoute isAdmin={authUser?.userType === UserType.Admin}>
              <DepartmentDetail />
            </AdminRoute>
          }
        ></Route>

        <Route
          path="/change-password"
          element={
            <LoginRoute isLoggedIn={authUser?.isLoggedIn}>
              <AuthChangePassword />
            </LoginRoute>
          }
        ></Route>
        <Route
          path="/edit-profile"
          element={
            <LoginRoute isLoggedIn={authUser?.isLoggedIn}>
              <AuthEditProfile />
            </LoginRoute>
          }
        ></Route>
        <Route path="/login" element={<AuthLogin />}></Route>
        <Route path="/logout" element={<AuthLogout />}></Route>
        <Route path="/signup" element={<AuthSignup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route
          path="/"
          element={
            <LoginRoute isLoggedIn={authUser?.isLoggedIn}>
              <EmployeeList />
            </LoginRoute>
          }
        ></Route>
        <Route
          path="/delete-employee/:id"
          element={
            <AdminRoute isAdmin={authUser?.userType === UserType.Admin}>
              <DeleteEmployee />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/employee-detail/:id"
          element={
            <LoginRoute isLoggedIn={authUser?.isLoggedIn}>
              <EmployeeDetail />
            </LoginRoute>
          }
        ></Route>
        {/* <Route path="*" element={<Navigate to="/home" replace/>}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
