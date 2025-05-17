import { Spinner, Box } from "grommet";

function LoaderBox() {
  return (
    <Box fill justify="center" align="center">
      <Spinner size="large" color="white" />
    </Box>
  );
}

export default LoaderBox;
