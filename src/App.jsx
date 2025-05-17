import { Box, Text } from "grommet";
import { Grommet } from "grommet";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { theme } from "./theme";
import ErrorFallback from "./ErrorFallback";
import LoaderBox from "./components/LoaderBox";

const KanbanBoard = lazy(() => import("./components/kanbanBoard"));

function App() {
  return (
    <Grommet full theme={theme}>
      <Box width="100vw" height="100vh" pad="small">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            window.location.reload();
          }}
        >
          <Suspense fallback={<LoaderBox />}>
            <KanbanBoard />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Grommet>
  );
}

export default App;
