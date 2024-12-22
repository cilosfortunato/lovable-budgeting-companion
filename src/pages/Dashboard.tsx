import { useEffect, useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { usePlanning } from "@/hooks/usePlanning";
import { LayoutDashboard, Wallet, ArrowUpCircle, ArrowDownCircle, Clock } from "lucide-react";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { transactions } = useTransactions();
  const { plans } = usePlanning();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedUser, setSelectedUser] = useState<string>("all");
  
  // Filter states
  const [searchItem, setSearchItem] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRegularity, setSelectedRegularity] = useState("all");
  const [selectedResponsible, setSelectedResponsible] = useState("all");

  // Fetch family members
  const { data: familyMembers = [] } = useQuery({
    queryKey: ["familyMembers"],
    queryFn: async () => {
      const { data: userProfile } = await supabase
        .from("profiles")
        .select("familia_id")
        .single();

      if (!userProfile?.familia_id) return [];

      const { data } = await supabase
        .from("profiles")
        .select("id, full_name")
        .eq("familia_id", userProfile.familia_id);

      return data || [];
    },
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter transactions based on selected user
  const filteredTransactions = transactions.filter(t => 
    selectedUser === "all" || t.responsavel === selectedUser
  );

  // Calculate summary data
  const totalIncome = filteredTransactions
    .filter(t => t.tipo === 'Receita')
    .reduce((sum, t) => sum + (typeof t.valor === 'number' ? t.valor : 0), 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.tipo === 'Despesa')
    .reduce((sum, t) => sum + (typeof t.valor === 'number' ? t.valor : 0), 0);

  const balance = totalIncome - totalExpenses;

  const totalPlanned = plans.reduce((sum, p) => sum + (typeof p.estimated_value === 'number' ? p.estimated_value : 0), 0);
  const totalSaved = plans.reduce((sum, p) => sum + (typeof p.saved_amount === 'number' ? p.saved_amount : 0), 0);
  const savingsProgress = totalPlanned > 0 ? (totalSaved / totalPlanned) * 100 : 0;

  // Calculate received and pending totals
  const totalReceived = filteredTransactions
    .filter(t => t.status === 'Recebido' && t.tipo === 'Receita')
    .reduce((sum, t) => sum + (typeof t.valor === 'number' ? t.valor : 0), 0);

  const totalPending = filteredTransactions
    .filter(t => t.status === 'Programado')
    .reduce((sum, t) => sum + (typeof t.valor === 'number' ? t.valor : 0), 0);

  // Prepare chart data
  const monthlyData = filteredTransactions.reduce((acc: any[], transaction) => {
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
    <div className="container max-w-7xl mx-auto px-4 py-6 space-y-6 bg-gradient-to-br from-white to-blue-50/30">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Dashboard Financeiro
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas finanças e planejamentos
            </p>
          </div>
        </div>
        
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione um membro" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os membros</SelectItem>
            {familyMembers.map((member) => (
              <SelectItem key={member.id} value={member.full_name}>
                {member.full_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Despesas em Aberto</p>
              <p className="text-2xl font-bold text-orange-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  filteredTransactions
                    .filter(t => t.tipo === 'Despesa' && t.status === 'Programado')
                    .reduce((sum, t) => sum + t.valor, 0)
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <ArrowDownCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Despesas Pagas</p>
              <p className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  filteredTransactions
                    .filter(t => t.tipo === 'Despesa' && t.status === 'Pago')
                    .reduce((sum, t) => sum + t.valor, 0)
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <ArrowUpCircle className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Receitas em Aberto</p>
              <p className="text-2xl font-bold text-blue-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  filteredTransactions
                    .filter(t => t.tipo === 'Receita' && t.status === 'Programado')
                    .reduce((sum, t) => sum + t.valor, 0)
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Saldo Disponível</p>
              <p className="text-2xl font-bold text-primary">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance)}
              </p>
            </div>
          </div>
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