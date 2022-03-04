import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Emotion from "./Emotion";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Emotion />
      </ThemeProvider>
    </div>
  );
}

export default App;
