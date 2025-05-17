import { useState, useCallback } from "react";
import { Box, Text } from "grommet";

export const useToast = () => {
  // State to hold active toasts
  const [toasts, setToasts] = useState([]);

  // Add toast message with type and auto-remove after duration
  const showToast = useCallback(
    (message, type = "success", duration = 5000) => {
      const id = Date.now(); // Unique ID based on timestamp

      // Add new toast to state
      setToasts((prev) => [...prev, { id, message, type }]);

      // Remove toast after duration timeout
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    },
    []
  );

  // Map toast type to background color
  const getBackgroundColor = (type) => {
    switch (type) {
      case "error":
        return "status-critical";
      case "info":
        return "#2196f3"; // custom blue color
      case "success":
      default:
        return "status-ok";
    }
  };

  // Toast container renders all active toasts in fixed position (top-right)
  const ToastContainer = () => (
    <Box
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 1000,
        pointerEvents: "none", // allows clicks through toasts
      }}
    >
      <Box gap="small">
        {toasts.map(({ id, message, type }) => (
          <Box
            key={id}
            background={getBackgroundColor(type)}
            round="small"
            pad={{ vertical: "small", horizontal: "medium" }}
            elevation="medium"
            animation="fadeIn"
            style={{ opacity: 0.5, minWidth: "200px" }}
          >
            <Text weight="bold" color="white">
              {message}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );

  return { showToast, ToastContainer };
};
