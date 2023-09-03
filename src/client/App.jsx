import { QueryClientProvider } from "react-query";
import "./App.css";
import Home from "./pages/Home";
import { queryClient } from "./utils/utils";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
