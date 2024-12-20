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
          <div className="text-sm text-green-600 font-medium">Pago</div>
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
    </div>
  );
}