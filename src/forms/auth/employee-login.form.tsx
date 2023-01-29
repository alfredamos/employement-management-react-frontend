import {useState} from "react";
import { EmployeeLoginDto } from "../../models/auth/employee-login.model";


interface EmployeeLoginProp{
    employeeInitial: EmployeeLoginDto;
    backToListHandler: () => void;
    onEmployeeLoginSubmit: (employee: EmployeeLoginDto) => void
}

export const EmployeeLogin = (props: EmployeeLoginProp) => {
    const {employeeInitial, backToListHandler, onEmployeeLoginSubmit} = props;
    const [employee, setEmployee] = useState(employeeInitial);

    const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onEmployeeLoginSubmit(employee);
    };

    const inputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
      const {name, value} = event.currentTarget;
      setEmployee({...employee, [name]: value});
    }
    return (
      <div className="border" style={{ padding: "10px" }}>
      <form onSubmit={loginHandler}>
        <div className="card">
          <div className="card-header">
            <h1 className="text-center">Employee Login Form</h1>
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
              <label className="form-label" id="password" htmlFor="password">
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
}