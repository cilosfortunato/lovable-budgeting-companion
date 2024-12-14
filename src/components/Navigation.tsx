import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Receipt, ShoppingBag } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="container max-w-md mx-auto px-4">
        <div className="flex justify-around items-center">
          <Link 
            to="/"
            className={`flex flex-col items-center p-2 ${
              isActive("/") ? "text-primary" : "text-gray-600"
            }`}
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          
          <Link
            to="/transactions"
            className={`flex flex-col items-center p-2 ${
              isActive("/transactions") ? "text-primary" : "text-gray-600"
            }`}
          >
            <Receipt className="w-6 h-6" />
            <span className="text-xs mt-1">Transações</span>
          </Link>
          
          <Link
            to="/planning"
            className={`flex flex-col items-center p-2 ${
              isActive("/planning") ? "text-primary" : "text-gray-600"
            }`}
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xs mt-1">Planejamento</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;