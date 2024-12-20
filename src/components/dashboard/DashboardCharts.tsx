import { useEffect, useRef } from "react";
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
import { TrendingUp, Target } from "lucide-react";

interface DashboardChartsProps {
  monthlyData: any[];
  planningStatusData: any[];
  windowWidth: number;
}

const STATUS_COLORS = {
  Planejado: "#6366f1",
  "Em Andamento": "#f59e0b",
  Concluído: "#22c55e",
  Cancelado: "#ef4444",
};

export function DashboardCharts({
  monthlyData,
  planningStatusData,
  windowWidth,
}: DashboardChartsProps) {
  const barChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const observer = new ResizeObserver((entries) => {
      // Use requestAnimationFrame to batch resize notifications
      rafId = requestAnimationFrame(() => {
        entries.forEach(() => {
          // Handle resize if needed in the future
        });
      });
    });

    if (barChartRef.current) {
      observer.observe(barChartRef.current);
    }
    if (pieChartRef.current) {
      observer.observe(pieChartRef.current);
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      observer.disconnect();
    };
  }, []);

  const getChartHeight = () => windowWidth < 768 ? 200 : 300;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Fluxo de Caixa Mensal
        </h2>
        <div ref={barChartRef} style={{ height: getChartHeight() }}>
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
        <div ref={pieChartRef} style={{ height: getChartHeight() }} className="flex items-center justify-center">
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
                    fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS]} 
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
  );
}