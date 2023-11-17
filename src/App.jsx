import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PerformanceChart from "./components/PerformanceChart";
import Header from "./components/Header";
import ActivityChart from "./components/ActivityChart";
import AverageSessionsChart from "./components/AverageSessionsChart";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/user/12" />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/user/:id/performance" element={<PerformanceChart />} />
          <Route path="/user/:id/activity" element={<ActivityChart />} />
          <Route path="/user/:id/average-session" element={<AverageSessionsChart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
