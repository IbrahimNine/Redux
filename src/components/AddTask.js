import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../JS/actions/actions";
import { v4 as uuidv4 } from "uuid";

function AddTask({ listTaskRef }) {
  const dispatch = useDispatch();
  const newTask = useRef("");
  const isLogged = useSelector((state) => state.user?._id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTaskID = uuidv4();
    dispatch(
      addTask(
        { taskId: newTaskID, desc: newTask.current, isDone: false },
        isLogged
      )
    );
    e.target.reset();
    newTask.current = "";
    setTimeout(() => {
      listTaskRef.current.scrollTop = listTaskRef.current.scrollHeight;
    }, 0);
  };
  return (
    <form className="AddTask" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your new task.."
        required
        defaultValue={newTask.current}
        onChange={(e) => (newTask.current = e.target.value)}
      />
      <button type="submit">Add to the List</button>
    </form>
  );
}

export default AddTask;
