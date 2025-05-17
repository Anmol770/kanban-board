import { Box, Layer, TextInput, Button, Text } from "grommet";
import { useTodoForm } from "./useTodoForm";

function TodoForm({
  handleClose,
  layer,
  columnId,
  setColumns,
  showToast,
  setFocusedTodoId,
}) {
  // Custom hook manages form state and submit logic
  const { inputText, setInputText, isSubmitting, onSubmit } = useTodoForm({
    layer,
    columnId,
    setColumns,
    showToast,
    handleClose,
    setFocusedTodoId,
  });

  return (
    <Layer onEsc={handleClose} onClickOutside={handleClose} responsive={false}>
      {/* Modal container with fixed width */}
      <Box width="medium" pad="small" gap="medium">
        <Text weight="bold" size="large">
          {/* Conditional title: Edit or Add based on presence of task id */}
          {layer?.data?.id ? "Edit" : "Add"} Task
        </Text>
        <TextInput
          placeholder="Enter your task..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          a11yTitle="Task input" // Accessibility label
        />
        <Box direction="row" justify="end" gap="small">
          <Button
            label="Cancel"
            onClick={handleClose} // Close form without saving
            a11yTitle="Cancel task input"
          />
          <Button
            label={isSubmitting ? "Submitting..." : "Submit"}
            primary
            onClick={onSubmit} // Trigger form submission
            disabled={
              !inputText.trim() || // Disable if input empty
              isSubmitting || // Disable while submitting
              layer.data.todo === inputText // Disable if text unchanged during edit
            }
            a11yTitle="Submit task"
          />
        </Box>
      </Box>
    </Layer>
  );
}

export default TodoForm;
