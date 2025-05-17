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
  const ref = useRef();
  const [highlight, setHighlight] = useState(false);

  const [, drop] = useDrop({ accept: ItemType });
  const [, drag] = useDrag({ type: ItemType, item: { ...todo, column } });

  drag(drop(ref));

  const onEditClick = () => handleEditClick(todo);
  const onDeleteClick = () => handleDeleteClick(todo);

  // Scroll and trigger highlight on focus
  useEffect(() => {
    if (isFocused && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlight(true);

      const timer = setTimeout(() => {
        setHighlight(false);
      }, 5000);

      // Outside click handler
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setHighlight(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

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
      className={`kanban-card ${highlight ? "highlight" : ""}`}
    >
      <Box gap="small">
        <Text truncate="tip">{todo.todo}</Text>
        <Box direction="row" wrap gap="small" justify="end">
          <Button size="small" label="Edit" onClick={onEditClick} />
          <Button size="small" label="Delete" onClick={onDeleteClick} />
        </Box>
      </Box>
    </Box>
  );
};

export default KanbanCard;
