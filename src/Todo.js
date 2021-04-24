import React, { useState, useEffect } from "react";
import "./Todo.css";
import todoLogo from "./Filesfolders-04-512.png";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());

  const addItem = () => {
    if (!inputData) {
    } else {
      setItems([...items, inputData]);
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const updated = items.filter((ele, ind) => {
      return ind !== id;
    });
    setItems(updated);
  };

  const deleteAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <div className="todo">
      <img src={todoLogo} alt="todoLogo" />
      <h3>Add Your To Do List Here...</h3>
      <div className="todo__create">
        <input
          type="text"
          placeholder="Title..."
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addItem();
            }
          }}
        />
        <Tooltip title="Add Item">
          <AddIcon className="todo__aIcon" onClick={addItem} />
        </Tooltip>
      </div>

      {items.map((el, id) => {
        return (
          <div key={id} className="todo__delete">
            <h4>{el}</h4>
            <Tooltip title="Delete Item">
              <DeleteIcon
                className="todo__dIcon"
                onClick={() => deleteItem(id)}
              />
            </Tooltip>
          </div>
        );
      })}

      <button onClick={deleteAll}>Delete All</button>
    </div>
  );
};

export default Todo;
