import * as CSS from "csstype";
import { Box } from "./components";
import { SystemConfigTypes } from "./system";

function showMeTheProps(cssProperties: SystemConfigTypes) {
  return "hello";
}

function showMeTheColor(color: CSS.Property.Color) {
  return color;
}
function showMeTheMargin(margin: CSS.Property.Margin) {
  return margin;
}

const TestingSystem = () => {
  const results = showMeTheProps({
    color: "var(--rh-color-white)",
    mb: "32",
  });
  const color = showMeTheColor("red");
  const margin = showMeTheMargin("red");
  return (
    <Box>
      <h3>TestingSystem</h3>
      <p>{results}</p>
      <p>{color}</p>
    </Box>
  );
};
export default TestingSystem;
