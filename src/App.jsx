import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Plot from "./pages/Plot";
import AppLayout from "./ui/AppLayout";
import Forecast from "./pages/Forecast";
import { ForecastProvider } from "./contexts/ForecastContext";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ForecastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Plot />} />
              <Route path="plot" element={<Plot />} />
              <Route path="forecast" element={<Forecast />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ForecastProvider>
    </QueryClientProvider>
  );
}

export default App;
