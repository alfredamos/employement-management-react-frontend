import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { EmployeeList } from './employees/employee-list';
import { DeleteEmployee } from './employees/delete-employee';
import { EmployeeDetail } from './employees/employee-detail';
import { DepartmentList } from './departments/department-list';
import { CreateDepartment } from './departments/create-department';
import { DeleteDepartment } from './departments/delete-department';
import { EditDepartment } from './departments/edit-department';
import { DepartmentDetail } from './departments/department-detail';
import { AuthChangePassword } from './auth/auth-change-password';
import { AuthEditProfile } from './auth/auth-edit-profile';
import { AuthLogin } from './auth/auth-login';
import { AuthSignup } from "./auth/auth-signup";
import {AuthLogout} from "./auth/auth-logout";
import { NavigationBar } from './utils/navigation.util';
import "./App.css";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/departments" element={<DepartmentList />}></Route>
        <Route path="/create-department" element={<CreateDepartment />}></Route>
        <Route
          path="/delete-department/:id"
          element={<DeleteDepartment />}
        ></Route>
        <Route path="/edit-department/:id" element={<EditDepartment />}></Route>
        <Route
          path="/department-detail/:id"
          element={<DepartmentDetail />}
        ></Route>

        <Route path="/change-password" element={<AuthChangePassword />}></Route>
        <Route path="/edit-profile" element={<AuthEditProfile />}></Route>
        <Route path="/login" element={<AuthLogin />}></Route>
        <Route path="/logout" element={<AuthLogout />}></Route>
        <Route path="/signup" element={<AuthSignup />}></Route>

        <Route path="/" element={<EmployeeList />}></Route>
        <Route path="/delete-employee/:id" element={<DeleteEmployee />}></Route>        
        <Route path="/employee-detail/:id" element={<EmployeeDetail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
