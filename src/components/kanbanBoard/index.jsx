import { Box, Text, ResponsiveContext } from "grommet";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useToast } from "../../hooks/useToast";
import KanbanColumn from "../KanbanColumn";
import { useKanbanBoard } from "./useKanban";
import { boards } from "../../constants";
import { useContext } from "react";

const KanbanBoard = () => {
  const { ToastContainer, showToast } = useToast();
  const {
    columns,
    isLoading,
    moveTodo,
    setColumns,
    focusedTodoId,
    setFocusedTodoId,
  } = useKanbanBoard(showToast);
  const size = useContext(ResponsiveContext);

  return (
    <Box fill>
      <ToastContainer />
      <Text
        size={size === "small" ? "24px" : "48px"}
        weight="bold"
        textAlign="center"
        margin={{ vertical: "medium", horizontal: "small" }}
      >
        React Kanban Board
      </Text>
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
          {boards.map(({ id, title }) => (
            <KanbanColumn
              key={id}
              title={title}
              todos={columns[id]}
              columnId={id}
              moveTodo={moveTodo}
              setColumns={setColumns}
              isLoading={isLoading}
              setFocusedTodoId={setFocusedTodoId}
              focusedTodoId={focusedTodoId}
            />
          ))}
        </Box>
      </DndProvider>
    </Box>
  );
};

export default KanbanBoard;
