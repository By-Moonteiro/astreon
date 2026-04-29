import { Home, Dumbbell, Play, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: Dumbbell, label: "Workouts", path: "/workouts" },
  { icon: Play, label: "Training", path: "/training" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const ButtomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d0f] border-t border-white/5">
      <div className="flex items-center justify-around gap-1 px-4 py-2 rounded-xl transition-all duration-200 group">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 group"
            >
              <div
                className={`p2 rounded-xl transition-all duration-200 ${isActive ? " bg-violet-600/20 text-violet-400" : "text-white/30 group-hover:text-white/60"}`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              </div>
              <span
                className={`text-[10px] font-medium tracking-wide transition-all duration-200 ${isActive ? "text-violet-400" : "text-white/30"}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
