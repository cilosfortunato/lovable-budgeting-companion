import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useTransactions } from "@/hooks/useTransactions";
import { usePlanning } from "@/hooks/usePlanning";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle, TrendingUp, TrendingDown, Wallet } from "lucide-react";

const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

const Dashboard = () => {
  const { transactions } = useTransactions();
  const { plans } = usePlanning();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate summary data
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const highPriorityPlans = plans.filter(p => p.priority === 'high').length;

  // Prepare chart data
  const monthlyData = transactions.reduce((acc: any[], transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    const existingMonth = acc.find(d => d.name === month);
    
    if (existingMonth) {
      if (transaction.type === 'income') {
        existingMonth.receitas += transaction.amount;
      } else {
        existingMonth.despesas += transaction.amount;
      }
    } else {
      acc.push({
        name: month,
        receitas: transaction.type === 'income' ? transaction.amount : 0,
        despesas: transaction.type === 'expense' ? transaction.amount : 0,
      });
    }
    
    return acc;
  }, []);

  const planningData = [
    { name: 'Alta', value: highPriorityPlans, color: '#ef4444' },
    { name: 'Média', value: plans.filter(p => p.priority === 'medium').length, color: '#f59e0b' },
    { name: 'Baixa', value: plans.filter(p => p.priority === 'low').length, color: '#22c55e' },
  ];

  // Adjust chart height based on window width
  const getChartHeight = () => {
    if (windowWidth < 768) {
      return 200;
    }
    return 250;
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      
      {/* Cards Informativos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Receitas</p>
            <p className="text-2xl font-bold">{formatCurrency(totalIncome)}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Despesas</p>
            <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Saldo</p>
            <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Alta Prioridade</p>
            <p className="text-2xl font-bold">{highPriorityPlans}</p>
          </div>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fluxo de Caixa */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Fluxo de Caixa</h2>
          <div style={{ height: getChartHeight() }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="receitas" fill="#22c55e" />
                <Bar dataKey="despesas" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Planejamentos por Prioridade */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Planejamentos por Prioridade</h2>
          <div style={{ height: getChartHeight() }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planningData}
                  cx="50%"
                  cy="50%"
                  innerRadius={windowWidth < 768 ? 40 : 60}
                  outerRadius={windowWidth < 768 ? 60 : 80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {planningData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;