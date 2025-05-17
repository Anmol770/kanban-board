import { useEffect, useState } from "react";
import todoApi from "../../gateways/todoApis";
import { sortTodos } from "../../utils/helpers";

export const useKanbanBoard = (showToast) => {
  const [columns, setColumns] = useState({
    pending: [],
    completed: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [focusedTodoId, setFocusedTodoId] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await todoApi.fetchAll();
        setColumns({
          pending: todos.filter((t) => !t.completed).sort(sortTodos),
          completed: todos.filter((t) => t.completed).sort(sortTodos),
        });
      } catch (error) {
        showToast(error?.details?.message || "Unable to fetch todos", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [showToast]);

  const moveTodo = async (draggedItem, toColumnId) => {
    if (draggedItem.column === toColumnId) return;
    try {
      setColumns((prev) => {
        const fromList = prev[draggedItem.column].filter(
          (t) => t.id !== draggedItem.id
        );
        const toList = [
          ...prev[toColumnId],
          { ...draggedItem, completed: toColumnId === "completed" },
        ].sort(sortTodos);

        return {
          ...prev,
          [draggedItem.column]: fromList,
          [toColumnId]: toList,
        };
      });
      setFocusedTodoId(draggedItem.id);
      showToast("Task status updated successfully");
      await todoApi.update(
        draggedItem.id,
        draggedItem.todo,
        toColumnId === "completed"
      );
    } catch (error) {
      if (error.status === 404 && error.details.message.includes("not found")) {
        showToast(
          "Task status updated locally — backend cannot persist this change.",
          "info"
        );
      } else
        showToast(
          error?.details?.message || "Failed to update task status",
          "error"
        );
    }
  };

  return {
    columns,
    isLoading,
    moveTodo,
    setColumns,
    setFocusedTodoId,
    focusedTodoId,
  };
};
