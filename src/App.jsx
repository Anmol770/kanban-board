import { Box, Text } from "grommet";
import { Grommet } from "grommet";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { theme } from "./theme";
import ErrorFallback from "./ErrorFallback";
import LoaderBox from "./components/LoaderBox";

// Lazy load KanbanBoard for code-splitting and better performance
const KanbanBoard = lazy(() => import("./components/kanbanBoard"));

function App() {
  return (
    <Grommet full theme={theme}>
      {/* Full viewport container with padding */}
      <Box width="100vw" height="100vh" pad="small">
        {/* Catch runtime errors, show fallback UI on error */}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.reload()} // Reload page on reset
        >
          {/* Show loader while KanbanBoard loads asynchronously */}
          <Suspense fallback={<LoaderBox />}>
            <KanbanBoard />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Grommet>
  );
}

export default App;
