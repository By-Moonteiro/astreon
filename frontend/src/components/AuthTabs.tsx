import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

export function AuthTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Tabs value={location.pathname}>
      <TabsList className="w-full bg-white/5 border border-white/10 p-1 rounded-2xl h-auto">
        <TabsTrigger
          value="/login"
          onClick={() => navigate("/login")}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-white/40 text-sm font-medium rounded-xl data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all duration-200"
        >
          <LogIn size={15} />
          Login
        </TabsTrigger>
        <TabsTrigger
          value="/register"
          onClick={() => navigate("/register")}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-white/40 text-sm font-medium rounded-xl data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all duration-200"
        >
          <UserPlus size={15} />
          Criar conta
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
