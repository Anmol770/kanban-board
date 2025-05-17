import { Box, Button } from "grommet";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Box pad="medium" background="status-error" round="small" gap="small">
      <Text weight="bold" color="white">
        Something went wrong:
      </Text>
      <Text color="white">{error.message}</Text>
      <Button onClick={resetErrorBoundary} label="Try Again" />
    </Box>
  );
}

export default ErrorFallback;
