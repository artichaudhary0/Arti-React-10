import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addtodo,
  toogleTodo,
  setTodoFilter,
  searchTodo,
  clearError,
} from "../feature/todosSlice";

function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();

  const { items, status, filter, searchTerm, error } = useSelector(
    (state) => state.todos
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addtodo(newTodo.trim()));
      setNewTodo("");
    }
  };

  const handletoogle = (id) => {
    dispatch(toogleTodo(id));
  };

  const handleFilterChange = (newFilter) => {
    dispatch(setTodoFilter(newFilter));
  };

  const handleSearch = (e) => {
    dispatch(searchTodo(e.target.value));
  };

  const filterItems = items
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="todo-container">
      <h1>To Do list</h1>

      {error && (
        <div className="error-message" onClick={() => dispatch(clearError())}>
          {error} <span className="dismiss">&times;</span>
        </div>
      )}

      <div className="filters">
        <input
          type="text"
          placeholder="seach todo"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        <div className="filter-button">
          <button
            onClick={() => handleFilterChange("all")}
            className={filter === "all" ? "active" : ""}
          >
            All
          </button>

          <button
            onClick={() => handleFilterChange("active")}
            className={filter === "active" ? "active" : ""}
          >
            Active
          </button>

          <button
            onClick={() => handleFilterChange("completed")}
            className={filter === "completed" ? "active" : ""}
          >
            Completed
          </button>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add new Todo"
              disabled={status === "loading"}
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Adding" : "Add Todo"}
            </button>
          </form>

          <ul className="todo-list">
            {filterItems.map((todo) => (
              <li
                key={todo.id}
                onClick={() => handletoogle(todo.id)}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                {todo.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
