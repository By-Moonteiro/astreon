import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { AppLayout } from "./components/layout/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Workouts } from "./pages/Workouts";
import { Profile } from "./pages/Profile";
import { WorkoutDetail } from "./pages/WorkoutDetail";
import { WorkoutSession } from "./pages/WorkoutSession";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/:id" element={<WorkoutDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/treino/:id" element={<WorkoutSession />} />
      </Routes>
    </BrowserRouter>
  );
};
