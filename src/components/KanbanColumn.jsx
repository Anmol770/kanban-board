import { useState } from "react";
import { Box, Text, Button, Spinner } from "grommet";
import { useDrop } from "react-dnd";
import { ItemType } from "../constants";
import KanbanCard from "./kanbanCard";
import todoApi from "../gateways/todoApis";
import { useToast } from "../hooks/useToast";
import TodoForm from "./todoForm";

const KanbanColumn = ({
  title,
  todos,
  columnId,
  moveTodo,
  setColumns,
  isLoading,
  setFocusedTodoId,
  focusedTodoId,
}) => {
  // Manages the visibility and data for the TodoForm layer (modal)
  const [layer, setLayer] = useState({ show: false, data: {} });
  const { showToast, ToastContainer } = useToast();

  /**
   * Setup drop target for drag-and-drop.
   * Accepts items of type ItemType.
   * On drop, calls moveTodo to handle moving the todo item to this column.
   */
  const [{ canDrop, isOver, draggedItem }, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      moveTodo(item, columnId);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggedItem: monitor.getItem(), // get access to dragged item
    }),
  });

  // Close the TodoForm modal
  const handleClose = () => {
    setLayer({ show: false, data: {} });
  };

  // Open modal for adding a new todo
  const handleAddClick = () => {
    setLayer({ show: true, data: {} });
  };

  // Open modal for editing an existing todo, passing current todo data
  const handleEditClick = (todo) => {
    setLayer({ show: true, data: { ...todo } });
  };

  /**
   * Deletes a todo item both locally and remotely.
   * Updates local state optimistically before awaiting API delete call.
   * Shows info toast if dummy API cannot persist delete (404).
   * Shows error toast on other failures.
   */
  const handleDeleteClick = async (todo) => {
    try {
      setColumns((prev) => {
        const key = todo.completed ? "completed" : "pending";
        const updatedList = prev[key].filter((t) => t.id !== todo.id);
        return {
          ...prev,
          [key]: updatedList,
        };
      });

      await todoApi.delete(todo.id);
      showToast("Task deleted successfully");
    } catch (error) {
      if (
        error.status === 404 &&
        error.details?.message?.includes("not found")
      ) {
        showToast(
          "Task removed locally — dummy API can't persist deletes",
          "info"
        );
      } else {
        showToast(error?.details?.message || "Failed to delete task", "error");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Box ref={drop} gap="small" background="#f4f4f4" round="4px" fill>
        {/* Column header with title and add button */}
        <Box
          direction="row"
          align="center"
          pad="small"
          justify="between"
          gap="small"
        >
          <Text size="large" truncate="tip" weight="bold">
            {title}
          </Text>
          {canDrop && isOver && draggedItem?.column !== columnId && (
            <Box pad={{ horizontal: "small" }}>
              <Text color="status-ok" weight="bold">
                Release to move task here
              </Text>
            </Box>
          )}
          <Button label="Add" onClick={handleAddClick} />
        </Box>
        {isLoading ? (
          <Box fill align="center" justify="center">
            <Spinner />
          </Box>
        ) : (
          <Box fill overflow="auto" pad="small" gap="small">
            {todos.map((todo) => (
              <KanbanCard
                key={todo.id}
                todo={todo}
                column={columnId}
                moveTodo={moveTodo}
                setColumns={setColumns}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
                isFocused={todo.id === focusedTodoId}
              />
            ))}
          </Box>
        )}
      </Box>
      {layer?.show && (
        <TodoForm
          handleClose={handleClose}
          layer={layer}
          columnId={columnId}
          setColumns={setColumns}
          showToast={showToast}
          setFocusedTodoId={setFocusedTodoId}
          focusedTodoId={focusedTodoId}
        />
      )}
    </>
  );
};

export default KanbanColumn;
