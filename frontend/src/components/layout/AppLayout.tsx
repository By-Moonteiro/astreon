import { Outlet } from "react-router-dom";
import { ButtomNav } from "./BottomNav";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white">
      <main className="pb-24">
        <Outlet />

        <ButtomNav />
      </main>
    </div>
  );
};
