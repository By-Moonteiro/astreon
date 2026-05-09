import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";

export function AuthTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Tabs value={location.pathname}>
      <TabsList className="bg-slate-800  w-full mb-6 mt-6">
        <TabsTrigger
          className="text-white"
          value="/login"
          onClick={() => navigate("/login")}
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          className="text-white"
          value="/register"
          onClick={() => navigate("/register")}
        >
          Register
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
