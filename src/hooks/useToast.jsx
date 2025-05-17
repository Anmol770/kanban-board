import { useState, useCallback } from "react";
import { Box, Text } from "grommet";

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(
    (message, type = "success", duration = 5000) => {
      const id = Date.now();

      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    },
    []
  );

  const getBackgroundColor = (type) => {
    switch (type) {
      case "error":
        return "status-critical";
      case "info":
        return "#2196f3";
      case "success":
      default:
        return "status-ok";
    }
  };

  const ToastContainer = () => (
    <Box
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 1000,
        pointerEvents: "none",
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
