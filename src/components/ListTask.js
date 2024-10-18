import React, { useRef } from "react";
import Task from "./Task";
import { useSelector } from "react-redux";

function ListTask({ listTaskRef }) {
  const myData = useSelector((state) => state.Tasks);
  const filterValue = useSelector((state) => state.filterValue);

  const filtredData = myData.filter((item) => {
    if (filterValue === "all") return true;
    if (filterValue === "done") return item.isDone === true;
    if (filterValue === "notDone") return item.isDone === false;
  });

  return (
    <div className="ListTask">
      <div className="ListTaskWrapper" ref={listTaskRef}>
        {filtredData.length ? (
          filtredData.map((item) => <Task key={item.taskId} {...item} />)
        ) : (
          <h6 id="noTasksMsg">
            No tasks for the moment,
            <br />
            add some or check your filters... 🙄
          </h6>
        )}
      </div>
    </div>
  );
}

export default ListTask;
