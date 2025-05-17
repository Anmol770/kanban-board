import { Box, Button } from "grommet";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    // Error UI container with red background and padding
    <Box pad="medium" background="status-error" round="small" gap="small">
      {/* Error heading */}
      <Text weight="bold" color="white">
        Something went wrong:
      </Text>
      {/* Display error message */}
      <Text color="white">{error.message}</Text>
      {/* Retry button triggers ErrorBoundary reset */}
      <Button onClick={resetErrorBoundary} label="Try Again" />
    </Box>
  );
}

export default ErrorFallback;
