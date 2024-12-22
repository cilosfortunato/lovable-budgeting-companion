import { useEffect, useRef, useState } from "react";
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
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, Target, Clock } from "lucide-react";

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

const CHART_COLORS = {
  receitas: "#22c55e",
  despesas: "#ef4444",
};

export function DashboardCharts({
  monthlyData,
  planningStatusData,
  windowWidth,
}: DashboardChartsProps) {
  const barChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const observer = new ResizeObserver((entries) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        entries.forEach((entry) => {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        });
      }, 100);
    });

    const barChart = barChartRef.current;
    const pieChart = pieChartRef.current;

    if (barChart) observer.observe(barChart);
    if (pieChart) observer.observe(pieChart);

    return () => {
      clearTimeout(timeoutId);
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
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
              <Bar name="Receitas" dataKey="receitas" fill={CHART_COLORS.receitas} radius={[4, 4, 0, 0]} />
              <Bar name="Despesas" dataKey="despesas" fill={CHART_COLORS.despesas} radius={[4, 4, 0, 0]} />
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

      <Card className="p-6 lg:col-span-2">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Histórico de Transações (6 meses)
        </h2>
        <div style={{ height: getChartHeight() }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
              <Line
                type="monotone"
                name="Receitas"
                dataKey="receitas"
                stroke={CHART_COLORS.receitas}
                strokeWidth={2}
                dot={{ fill: CHART_COLORS.receitas }}
              />
              <Line
                type="monotone"
                name="Despesas"
                dataKey="despesas"
                stroke={CHART_COLORS.despesas}
                strokeWidth={2}
                dot={{ fill: CHART_COLORS.despesas }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}