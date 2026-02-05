import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// ✅ Lazy load components for code splitting
const HumanResources = lazy(() => import("./app/dashboard/HumanResources"));
const Layout = lazy(() => import("./app/dashboard/Layout"));

function App() {
  return (
    <BrowserRouter>
      {/* Suspense provides a fallback while chunks are loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Layout route */}
          <Route path="/" element={<Layout />}>
            {/* Nested routes inside layout */}
            <Route index element={<HumanResources />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
