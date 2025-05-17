import { Box, Text, ResponsiveContext } from "grommet";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useToast } from "../../hooks/useToast";
import KanbanColumn from "../KanbanColumn";
import { useKanbanBoard } from "./useKanban";
import { boards } from "../../constants";
import { useContext } from "react";

const KanbanBoard = () => {
  const { ToastContainer, showToast } = useToast(); // Toast hook for notifications
  const {
    columns,
    isLoading,
    moveTodo,
    setColumns,
    focusedTodoId,
    setFocusedTodoId,
  } = useKanbanBoard(showToast); // Custom hook managing board state & logic
  const size = useContext(ResponsiveContext); // Responsive breakpoint from Grommet

  return (
    <Box fill>
      <ToastContainer /> {/* Render toast notifications */}
      <Text
        size={size === "small" ? "24px" : "48px"} // Responsive font size
        weight="bold"
        textAlign="center"
        margin={{ vertical: "medium", horizontal: "small" }}
      >
        React Kanban Board
      </Text>
      {/* Setup drag-and-drop context with HTML5 backend */}
      <DndProvider backend={HTML5Backend}>
        <Box
          pad={{
            vertical: "medium",
            horizontal: size === "small" ? "small" : "100px",
          }}
          gap="medium"
          direction="row"
          align="start"
          justify={size === "small" ? "start" : "center"}
          fill
        >
          {/* Render columns dynamically from boards constant */}
          {boards.map(({ id, title }) => (
            <KanbanColumn
              key={id}
              title={title}
              todos={columns[id]} // Todos for each column
              columnId={id}
              moveTodo={moveTodo} // Drag & drop move handler
              setColumns={setColumns} // Update columns state
              isLoading={isLoading}
              setFocusedTodoId={setFocusedTodoId} // Manage focused todo for UI
              focusedTodoId={focusedTodoId}
            />
          ))}
        </Box>
      </DndProvider>
    </Box>
  );
};

export default KanbanBoard;
