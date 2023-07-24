import GridPage from "./pages/GridPage";
import HomePage from "./pages/HomePage";
import ChartPage from "./pages/ChartPage";
import { Routes, Route, Navigate } from "react-router-dom";

function APP() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Grid" element={<GridPage />} />
        <Route path="/Chart" element={<ChartPage />} />
      </Routes>
    </div>
  );
}
export default APP;
