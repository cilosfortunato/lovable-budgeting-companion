import { useEffect, useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { usePlanning } from "@/hooks/usePlanning";
import { LayoutDashboard } from "lucide-react";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";

const Dashboard = () => {
  const { transactions } = useTransactions();
  const { plans } = usePlanning();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Filter states
  const [searchItem, setSearchItem] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRegularity, setSelectedRegularity] = useState("all");
  const [selectedResponsible, setSelectedResponsible] = useState("all");

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
  const savingsProgress = totalPlanned > 0 ? (totalSaved / totalPlanned) * 100 : 0;

  // Calculate received and pending totals for the current month
  const currentDate = new Date();
  const currentMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentDate.getMonth() &&
           transactionDate.getFullYear() === currentDate.getFullYear();
  });

  const totalReceived = currentMonthTransactions
    .filter(t => t.status === 'Pago')
    .reduce((sum, t) => sum + (typeof t.valor === 'number' ? t.valor : 0), 0);

  const totalPending = currentMonthTransactions
    .filter(t => t.status === 'Programado')
    .reduce((sum, t) => sum + (typeof t.valor === 'number' ? t.valor : 0), 0);

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

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <LayoutDashboard className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Financeiro</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas finanças e planejamentos
          </p>
        </div>
      </div>

      <DashboardFilters
        searchItem={searchItem}
        onSearchItemChange={setSearchItem}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedRegularity={selectedRegularity}
        onRegularityChange={setSelectedRegularity}
        selectedResponsible={selectedResponsible}
        onResponsibleChange={setSelectedResponsible}
        totalReceived={totalReceived}
        totalPending={totalPending}
      />
      
      <DashboardSummary
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
        savingsProgress={savingsProgress}
      />

      <DashboardCharts
        monthlyData={monthlyData}
        planningStatusData={planningStatusData}
        windowWidth={windowWidth}
      />
    </div>
  );
};

export default Dashboard;