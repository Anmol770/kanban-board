// src/hooks/useTodoForm.js
import { useState } from "react";
import todoApi from "../../gateways/todoApis";
import { sortTodos } from "../../utils/helpers";

export const useTodoForm = ({
  layer,
  columnId,
  setColumns,
  showToast,
  handleClose,
  setFocusedTodoId,
}) => {
  const [inputText, setInputText] = useState(layer?.data?.todo ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getColumnKey = (completed) => (completed ? "completed" : "pending");

  const handleUpdate = async (todo) => {
    const key = getColumnKey(todo.completed);
    setColumns((prev) => ({
      ...prev,
      [key]: prev[key]
        .map((t) => (t.id === todo.id ? todo : t))
        .sort(sortTodos),
    }));
    await todoApi.update(todo.id, todo.todo, todo.completed);
    showToast("Task updated successfully");
    setFocusedTodoId(todo?.id);
  };

  const handleCreate = async () => {
    const resp = await todoApi.create(inputText, columnId);
    const newTodo = {
      ...resp,
      id: Date.now(),
      completed: columnId === "completed",
    };
    const key = getColumnKey(newTodo.completed);
    setColumns((prev) => ({
      ...prev,
      [key]: [...prev[key], newTodo].sort(sortTodos),
    }));
    showToast(
      `${newTodo.completed ? "Completed" : "Pending"} task added successfully`
    );
    setFocusedTodoId(newTodo?.id);
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    const todo = { ...layer?.data, todo: inputText };
    try {
      if (layer?.data?.id) {
        await handleUpdate(todo);
      } else {
        await handleCreate();
      }
    } catch (error) {
      if (
        error.status === 404 &&
        error.details?.message?.includes("not found")
      ) {
        showToast(
          `Task updated locally — API can't persist added task updates`,
          "info"
        );
      } else {
        showToast(error?.details?.message || "Failed to update task", "error");
      }
    } finally {
      setIsSubmitting(false);
      handleClose();
    }
  };

  return {
    inputText,
    setInputText,
    isSubmitting,
    onSubmit,
  };
};
