import { BrowserRouter, Route, Routes } from "react-router-dom";
import HumanResources from "./app/dashboard/HumanResources";
import Layout from "./app/dashboard/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout route */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes inside layout */}
          <Route index element={<HumanResources />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
