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
  // Initialize input with existing todo text if editing
  const [inputText, setInputText] = useState(layer?.data?.todo ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper: choose column key based on completed status
  const getColumnKey = (completed) => (completed ? "completed" : "pending");

  // Update existing todo in local state and API (dummy)
  const handleUpdate = async (todo) => {
    const key = getColumnKey(todo.completed);
    setColumns((prev) => ({
      ...prev,
      [key]: prev[key]
        .map((t) => (t.id === todo.id ? todo : t))
        .sort(sortTodos), // Keep todos sorted alphabetically
    }));
    await todoApi.update(todo.id, todo.todo, todo.completed); // API call (dummy)
    showToast("Task updated successfully");
    setFocusedTodoId(todo?.id); // Highlight updated todo
  };

  // Create new todo locally and via API (dummy)
  const handleCreate = async () => {
    const resp = await todoApi.create(inputText, columnId); // API call (dummy)
    const newTodo = {
      ...resp,
      id: Date.now(), // Generate temporary id locally
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

  // Submit handler: decides create or update
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
      // Show info if API can't update (dummy backend limitation)
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
      handleClose(); // Close form modal
    }
  };

  return {
    inputText,
    setInputText,
    isSubmitting,
    onSubmit,
  };
};
