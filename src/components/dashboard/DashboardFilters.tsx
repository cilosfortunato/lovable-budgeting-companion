import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DashboardFiltersProps {
  searchItem: string;
  onSearchItemChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedRegularity: string;
  onRegularityChange: (value: string) => void;
  selectedResponsible: string;
  onResponsibleChange: (value: string) => void;
  totalReceived: number;
  totalPending: number;
}

export function DashboardFilters({
  searchItem,
  onSearchItemChange,
  selectedStatus,
  onStatusChange,
  selectedRegularity,
  onRegularityChange,
  selectedResponsible,
  onResponsibleChange,
  totalReceived,
  totalPending,
}: DashboardFiltersProps) {
  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .order("full_name");
      return data || [];
    },
  });

  return (
    <div className="space-y-4">
      {/* Totals Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-sm text-green-600 font-medium">Total Recebido</div>
          <div className="text-2xl font-bold text-green-700">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalReceived)}
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="text-sm text-orange-600 font-medium">Total em Aberto</div>
          <div className="text-2xl font-bold text-orange-700">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPending)}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          placeholder="Buscar por Item..."
          value={searchItem}
          onChange={(e) => onSearchItemChange(e.target.value)}
          className="w-full"
        />

        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Pago">Pago</SelectItem>
            <SelectItem value="Programado">Programado</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedRegularity} onValueChange={onRegularityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Regularidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Mensal">Mensal</SelectItem>
            <SelectItem value="Semanal">Semanal</SelectItem>
            <SelectItem value="Trimestral">Trimestral</SelectItem>
            <SelectItem value="Anual">Anual</SelectItem>
            <SelectItem value="Único">Único</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedResponsible} onValueChange={onResponsibleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Responsável" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {profiles.map((profile) => (
              <SelectItem key={profile.full_name} value={profile.full_name}>
                {profile.full_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}