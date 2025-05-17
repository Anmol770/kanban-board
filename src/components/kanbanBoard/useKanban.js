import { useEffect, useState } from "react";
import todoApi from "../../gateways/todoApis";
import { sortTodos } from "../../utils/helpers";

export const useKanbanBoard = (showToast) => {
  // Columns state holds todos split by 'pending' and 'completed'
  const [columns, setColumns] = useState({
    pending: [],
    completed: [],
  });
  const [isLoading, setIsLoading] = useState(true); // Loading state for API fetch
  const [focusedTodoId, setFocusedTodoId] = useState(null); // Currently focused todo item

  // Fetch todos on mount, split into columns, sort alphabetically
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await todoApi.fetchAll();
        setColumns({
          pending: todos.filter((t) => !t.completed).sort(sortTodos),
          completed: todos.filter((t) => t.completed).sort(sortTodos),
        });
      } catch (error) {
        // Show error toast with message from API or fallback
        showToast(error?.details?.message || "Unable to fetch todos", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [showToast]);

  // Move todo between columns and update local state
  const moveTodo = async (draggedItem, toColumnId) => {
    if (draggedItem.column === toColumnId) return; // No-op if same column

    try {
      // Update local state immediately (optimistic UI)
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

      // Dummy API call - no real backend update
      await todoApi.update(
        draggedItem.id,
        draggedItem.todo,
        toColumnId === "completed"
      );
    } catch (error) {
      // Inform user local update done, backend does not support changes
      if (error.status === 404 && error.details.message.includes("not found")) {
        showToast(
          "Task status updated locally — backend cannot save changes.",
          "info"
        );
      } else {
        // General error message
        showToast(
          error?.details?.message || "Failed to update task status",
          "error"
        );
      }
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
