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
  LineChart,
  Line,
} from "recharts";

const mockBarData = [
  { name: "Jan", receitas: 4000, despesas: 2400 },
  { name: "Fev", receitas: 3000, despesas: 1398 },
  { name: "Mar", receitas: 2000, despesas: 9800 },
  { name: "Abr", receitas: 2780, despesas: 3908 },
];

const mockPieData = [
  { name: "Moradia", value: 2400 },
  { name: "Alimentação", value: 1398 },
  { name: "Transporte", value: 9800 },
  { name: "Lazer", value: 3908 },
];

const mockLineData = [
  { name: "01/04", saldo: 4000 },
  { name: "08/04", saldo: 3000 },
  { name: "15/04", saldo: 5000 },
  { name: "22/04", saldo: 2780 },
  { name: "30/04", saldo: 6000 },
];

const COLORS = ["#6366f1", "#a5b4fc", "#22c55e", "#f59e0b"];

const Dashboard = () => {
  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Saldo Card */}
      <Card className="p-6 mb-6">
        <h2 className="text-sm text-gray-600 mb-1">Saldo Total</h2>
        <p className="text-3xl font-bold text-primary">R$ 12.540,00</p>
      </Card>

      {/* Resumo do Mês */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <h3 className="text-sm text-gray-600 mb-1">Receitas</h3>
          <p className="text-lg font-semibold text-success">R$ 8.500,00</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-gray-600 mb-1">Despesas</h3>
          <p className="text-lg font-semibold text-destructive">R$ 5.960,00</p>
        </Card>
      </div>

      {/* Fluxo de Caixa */}
      <Card className="p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Fluxo de Caixa</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockBarData}>
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

      {/* Despesas por Categoria */}
      <Card className="p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Despesas por Categoria</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Evolução do Saldo */}
      <Card className="p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Evolução do Saldo</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="saldo" stroke="#6366f1" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;