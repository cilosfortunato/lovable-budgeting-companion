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
  Legend,
} from "recharts";
import { useTransactions } from "@/hooks/useTransactions";
import { usePlanning } from "@/hooks/usePlanning";
import { formatCurrency } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertTriangle,
  LayoutDashboard,
  Target,
} from "lucide-react";

const COLORS = ["#6366f1", "#a5b4fc", "#22c55e", "#f59e0b", "#ef4444"];
const STATUS_COLORS = {
  Planejado: "#6366f1",
  "Em Andamento": "#f59e0b",
  Concluído: "#22c55e",
  Cancelado: "#ef4444",
};

const Dashboard = () => {
  const { transactions } = useTransactions();
  const { plans } = usePlanning();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate summary data
  const totalIncome = transactions
    .filter(t => t.tipo === 'Receita')
    .reduce((sum, t) => sum + (typeof t.valor === 'number' ? t.valor : 0), 0);

  const totalExpenses = transactions
    .filter(t => t.tipo === 'Despesa')
    .reduce((sum, t) => sum + (typeof t.valor === 'number' ? t.valor : 0), 0);

  const balance = totalIncome - totalExpenses;

  const totalPlanned = plans.reduce((sum, p) => sum + (typeof p.estimated_value === 'number' ? p.estimated_value : 0), 0);
  const totalSaved = plans.reduce((sum, p) => sum + (typeof p.saved_amount === 'number' ? p.saved_amount : 0), 0);

  // Prepare chart data
  const monthlyData = transactions.reduce((acc: any[], transaction) => {
    const month = new Date(transaction.date).toLocaleString('pt-BR', { month: 'short' });
    const existingMonth = acc.find(d => d.name === month);
    
    if (existingMonth) {
      if (transaction.tipo === 'Receita') {
        existingMonth.receitas += transaction.valor;
      } else {
        existingMonth.despesas += transaction.valor;
      }
    } else {
      acc.push({
        name: month,
        receitas: transaction.tipo === 'Receita' ? transaction.valor : 0,
        despesas: transaction.tipo === 'Despesa' ? transaction.valor : 0,
      });
    }
    
    return acc;
  }, []);

  const planningStatusData = [
    { name: 'Planejado', value: plans.filter(p => p.status === 'Planejado').length },
    { name: 'Em Andamento', value: plans.filter(p => p.status === 'Em Andamento').length },
    { name: 'Concluído', value: plans.filter(p => p.status === 'Concluído').length },
    { name: 'Cancelado', value: plans.filter(p => p.status === 'Cancelado').length },
  ].filter(item => item.value > 0);

  const getChartHeight = () => windowWidth < 768 ? 200 : 300;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <LayoutDashboard className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Financeiro</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas finanças e planejamentos
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
              {((totalSaved / totalPlanned) * 100).toFixed(1)}%
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Fluxo de Caixa Mensal
          </h2>
          <div style={{ height: getChartHeight() }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar name="Receitas" dataKey="receitas" fill="#22c55e" />
                <Bar name="Despesas" dataKey="despesas" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Status dos Planejamentos
          </h2>
          <div style={{ height: getChartHeight() }} className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planningStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={windowWidth < 768 ? 40 : 60}
                  outerRadius={windowWidth < 768 ? 80 : 100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {planningStatusData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Próximos Vencimentos
          </h2>
          <div className="space-y-4">
            {transactions
              .filter(t => new Date(t.date) > new Date() && t.status === 'Programado')
              .slice(0, 5)
              .map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{transaction.descricao}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <p className={`font-bold ${transaction.tipo === 'Receita' ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(transaction.valor)}
                  </p>
                </div>
              ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Metas Prioritárias
          </h2>
          <div className="space-y-4">
            {plans
              .filter(p => p.priority === 'Alta' && p.status !== 'Concluído')
              .slice(0, 5)
              .map((plan, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{plan.item}</p>
                    <p className="text-sm text-gray-500">
                      Meta: {formatCurrency(plan.estimated_value)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      {formatCurrency(plan.saved_amount)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {((plan.saved_amount / plan.estimated_value) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;