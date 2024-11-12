import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAsDone, deleteTask, editTask } from "../JS/actions/actions";

function Task({ taskId, description, isDone }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const newTaskDescription = useRef(description);
  const isLogged = useSelector((state) => state.user?._id);

  const handleSave = () => {
    setShow(!show);
    dispatch(
      editTask({ taskId, desc: newTaskDescription.current, isDone }, isLogged)
    );
  };
  const handeCancel = () => {
    setShow(!show);
    newTaskDescription.current = description;
  };
  return (
    <div className="Task">
      {show ? (
        <>
          <input
            className="edit-task"
            defaultValue={description}
            onChange={(e) => (newTaskDescription.current = e.target.value)}
            type="text"
            required
          />
          <div className="controls editing">
            <abbr title="Save">
              <button onClick={handleSave}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="bi bi-floppy2-fill"
                  viewBox="0 0 16 16"
                  color="white"
                >
                  <path d="M12 2h-2v3h2z" />
                  <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1" />
                </svg>
              </button>
            </abbr>
            <abbr title="Cancel editing">
              <button onClick={handeCancel}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="bi bi-arrow-counterclockwise"
                  viewBox="0 0 16 16"
                  color="white"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                </svg>
              </button>
            </abbr>
          </div>
        </>
      ) : (
        <>
          <abbr title={description}>
            <h5 style={{ textDecorationLine: isDone ? "line-through" : "" }}>
              {description}
            </h5>
          </abbr>

          <div className="controls">
            <abbr title="Done">
              <input
                type="checkbox"
                checked={isDone}
                onChange={() =>
                  dispatch(
                    checkAsDone({ taskId, description, isDone }, isLogged)
                  )
                }
              />
            </abbr>
            <abbr title="Edit">
              <button onClick={() => setShow(!show)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                  color="white"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </button>
            </abbr>
            <abbr title="Remove">
              <button onClick={() => dispatch(deleteTask(taskId, isLogged))}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                  color="white"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </button>
            </abbr>
          </div>
        </>
      )}
    </div>
  );
}

export default Task;
