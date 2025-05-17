import { useRef, useEffect, useState } from "react";
import { Box, Button, Text } from "grommet";
import { useDrag, useDrop } from "react-dnd";
import { ItemType } from "../../constants";
import "./KanbanCard.css";

const KanbanCard = ({
  todo,
  column,
  handleDeleteClick,
  handleEditClick,
  isFocused,
}) => {
  const ref = useRef(); // Ref for DOM node to control scroll & event detection
  const [highlight, setHighlight] = useState(false); // Highlight on focus

  // Setup react-dnd hooks for drag and drop
  const [, drop] = useDrop({ accept: ItemType });
  const [, drag] = useDrag({ type: ItemType, item: { ...todo, column } });

  drag(drop(ref)); // Make element both draggable and droppable

  const onEditClick = () => handleEditClick(todo);
  const onDeleteClick = () => handleDeleteClick(todo);

  // Scroll card into view and highlight if focused
  useEffect(() => {
    if (isFocused && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlight(true);

      // Remove highlight after 5 seconds
      const timer = setTimeout(() => {
        setHighlight(false);
      }, 5000);

      // Remove highlight if clicked outside card
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setHighlight(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      // Cleanup listeners and timers on unmount or focus change
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isFocused]);

  return (
    <Box
      ref={ref}
      pad="small"
      elevation="small"
      round="4px"
      flex={{ shrink: 0 }}
      className={`kanban-card ${highlight ? "highlight" : ""}`} // CSS highlight class toggled
    >
      <Box gap="small">
        <Text truncate="tip">{todo.todo}</Text>{" "}
        {/* Show todo text with truncation */}
        <Box direction="row" wrap gap="small" justify="end">
          <Button size="small" label="Edit" onClick={onEditClick} />
          <Button size="small" label="Delete" onClick={onDeleteClick} />
        </Box>
      </Box>
    </Box>
  );
};

export default KanbanCard;
