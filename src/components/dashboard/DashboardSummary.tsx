import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, Target } from "lucide-react";

interface DashboardSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsProgress: number;
}

export function DashboardSummary({
  totalIncome,
  totalExpenses,
  balance,
  savingsProgress,
}: DashboardSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-green-500" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Receitas</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <TrendingDown className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Despesas</p>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Wallet className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Saldo</p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(balance)}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
          <Target className="w-6 h-6 text-orange-500" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Meta de Economia</p>
          <p className="text-2xl font-bold text-orange-600">
            {savingsProgress.toFixed(1)}%
          </p>
        </div>
      </Card>
    </div>
  );
}