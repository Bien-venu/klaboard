import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const HumanResources = lazy(() => import("./app/dashboard/HumanResources"));
const Layout = lazy(() => import("./app/dashboard/Layout"));
const Loading = lazy(() => import("./components/Loading"));
import "./i18n";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HumanResources />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
