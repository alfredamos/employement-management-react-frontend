import { useState } from "react";
import { EmployeeChangePasswordDto } from "../../models/auth/employee-change-password.model";

interface EmployeeChangePasswordProp {
  employeeInitial: EmployeeChangePasswordDto;
  backToListHandler: () => void;
  onChangePasswordSubmit: (employee: EmployeeChangePasswordDto) => void;
}

export const EmployeeChangePassword = (props: EmployeeChangePasswordProp) => {
  const { employeeInitial, backToListHandler, onChangePasswordSubmit } = props;
  const [employee, setEmployee] = useState(employeeInitial);

  const changePasswordHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChangePasswordSubmit(employee);
  };

  const inputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setEmployee({ ...employee, [name]: value });
  };
  return (
    <div className="border" style={{ padding: "10px" }}>
      <form onSubmit={changePasswordHandler}>
        <div className="card">
          <div className="card-header">
            <h1 className="text-center">Employee Change Password Form</h1>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label" id="email" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={employee.email}
                className="form-control"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                id="oldPassword"
                htmlFor="oldPassword"
              >
                Old Password
              </label>
              <input
                id="oldPassword"
                name="oldPassword"
                type="password"
                value={employee.oldPassword}
                className="form-control"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                id="newPassword"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={employee.newPassword}
                className="form-control"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                id="confirmPassword"
                htmlFor="confirmPassword"
              >
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
