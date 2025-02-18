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

  return <div></div>;
}

export default TodoList;
