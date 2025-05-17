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
      <Box width="medium" pad="small" gap="medium">
        <Text weight="bold" size="large">
          {layer?.data?.id ? "Edit" : "Add"} Task
        </Text>
        <TextInput
          placeholder="Enter your task..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          a11yTitle="Task input"
        />
        <Box direction="row" justify="end" gap="small">
          <Button
            label="Cancel"
            onClick={handleClose}
            a11yTitle="Cancel task input"
          />
          <Button
            label={isSubmitting ? "Submitting..." : "Submit"}
            primary
            onClick={onSubmit}
            disabled={
              !inputText.trim() || isSubmitting || layer.data.todo === inputText
            }
            a11yTitle="Submit task"
          />
        </Box>
      </Box>
    </Layer>
  );
}

export default TodoForm;
