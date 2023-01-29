import { useState } from "react";
import { EmployeeSignupDto } from "../../models/auth/employee-signup.model";
import { DepartmentDto } from "../../models/departments/department.model";

interface EmployeeSignupProp {
  employeeInitial: EmployeeSignupDto;
  departments: DepartmentDto[];
  backToListHandler: () => void;
  onEmployeeSignupSubmit: (employee: EmployeeSignupDto) => void;
}

export const EmployeeSignup = (props: EmployeeSignupProp) => {
  const {
    employeeInitial,
    backToListHandler,
    onEmployeeSignupSubmit,
    departments,
  } = props;
  const [employee, setEmployee] = useState(employeeInitial);

  const signupHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onEmployeeSignupSubmit(employee);
  };

  const inputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setEmployee({ ...employee, [name]: value });
  };

  const inputSelectChangeHandler = (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setEmployee({ ...employee, [name]: value });
  };

  return (
    <div className="border" style={{ padding: "10px" }}>
    <form onSubmit={signupHandler}>
      <div className="card">
        <div className="card-header">
          <h1 className="text-center">Employee Signup Form</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label id="fullName" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={employee.fullName}
              className="form-control"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label id="email" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={employee.email}
              className="form-control"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label id="phone" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={employee.phone}
              className="form-control"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label id="password" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={employee.password}
              className="form-control"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label id="confirmPassword" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={employee.confirmPassword}
              className="form-control"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label id="dateOfBirth" htmlFor="dateOfBirth">
              Date Of Birth
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={employee.dateOfBirth}
              className="form-control"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label id="gender" htmlFor="gender">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="form-control"
              value={employee.gender}
              onChange={inputSelectChangeHandler}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div className="mb-3">
            <label id="departmentId" htmlFor="departmentId">
              Department
            </label>
            <select
              name="departmentId"
              id="departmentId"
              value={employee.departmentId}
              className="form-control"
              onChange={inputSelectChangeHandler}
            >
              {departments.map((department) => (
                <option value={department.id} key={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-outline-primary form-control m-1"
            type="submit"
          >
            Submit
          </button>
          <button
            className="btn btn-outline-secondary form-control m-1"
            type="button"
            onClick={backToListHandler}
          >
            Back
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};
