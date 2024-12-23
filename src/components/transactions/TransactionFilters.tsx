import { Search, Filter, ArrowUpCircle, ArrowDownCircle, CheckCircle2, Clock, User, Repeat } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface TransactionFiltersProps {
  onFilterChange: (filters: {
    tipo?: string;
    status?: string;
    regularidade?: string;
    responsavel?: string;
  }) => void;
}

export const TransactionFilters = ({ onFilterChange }: TransactionFiltersProps) => {
  const { data: familyMembers = [] } = useQuery({
    queryKey: ["familyMembers"],
    queryFn: async () => {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("full_name")
        .order("full_name");
      return profiles || [];
    },
  });

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar transações..."
            className="pl-9 bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select onValueChange={(value) => onFilterChange({ tipo: value })}>
            <SelectTrigger className="w-[140px] bg-white">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                <span>Tipo</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Receita">
                <span className="flex items-center gap-2">
                  <ArrowUpCircle className="h-4 w-4 text-success" />
                  Receita
                </span>
              </SelectItem>
              <SelectItem value="Despesa">
                <span className="flex items-center gap-2">
                  <ArrowDownCircle className="h-4 w-4 text-destructive" />
                  Despesa
                </span>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => onFilterChange({ status: value })}>
            <SelectTrigger className="w-[140px] bg-white">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Programado">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-warning" />
                  Programado
                </span>
              </SelectItem>
              <SelectItem value="Pago">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Pago
                </span>
              </SelectItem>
              <SelectItem value="Recebido">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Recebido
                </span>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => onFilterChange({ regularidade: value })}>
            <SelectTrigger className="w-[140px] bg-white">
              <div className="flex items-center gap-2">
                <Repeat className="h-4 w-4 text-primary" />
                <span>Regularidade</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Único">Único</SelectItem>
              <SelectItem value="Mensal">Mensal</SelectItem>
              <SelectItem value="Anual">Anual</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => onFilterChange({ responsavel: value })}>
            <SelectTrigger className="w-[140px] bg-white">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span>Responsável</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {familyMembers.map((member) => (
                <SelectItem key={member.full_name} value={member.full_name}>
                  {member.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};