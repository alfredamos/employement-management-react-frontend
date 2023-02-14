import { useState } from "react";
import {DepartmentDto as Department} from "../../models/departments/department.model"

interface DepartmentProp {
  departmentInitial: Department;
  backToListHandler: () => void;
  onDepartmentSubmit: (department: Department) => void;
}

export const DepartmentForm = (props: DepartmentProp) => {
  const { departmentInitial, backToListHandler, onDepartmentSubmit } = props;
  const [department, setDepartment] = useState(departmentInitial);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onDepartmentSubmit(department);
  };

  const inputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setDepartment({ ...department, [name]: value });
  };
  return (
    <div className="border" style={{ padding: "10px" }}>
      <form onSubmit={submitHandler}>
        <div className="card">
          <div className="card-header">
            <h1 className="text-center">Department Submit Form</h1>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label" id="name" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={department.name}
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
