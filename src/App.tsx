import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const HumanResources = lazy(() => import("./app/dashboard/HumanResources"));
const Layout = lazy(() => import("./app/dashboard/Layout"));
const Loading = lazy(() => import("./components/Loading"));

function App() {
  return (
    <BrowserRouter>
      {/* Suspense provides a fallback while chunks are loading */}
      <Suspense fallback={<Loading />}>
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
