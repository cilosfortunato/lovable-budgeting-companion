import { useQuery } from "@tanstack/react-query";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const BankAccountField = ({ form }: { form: any }) => {
  const status = form.watch("status");
  const tipo = form.watch("tipo");
  const shouldShow = (status === "Pago" && tipo === "Despesa") || (status === "Recebido" && tipo === "Receita");

  const { data: bankAccounts = [] } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("contas_bancarias")
        .select("id, nome_conta, saldo")
        .order("nome_conta");
      return data || [];
    },
  });

  if (!shouldShow) return null;

  return (
    <FormField
      control={form.control}
      name="conta_bancaria_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            Conta Bancária
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value || ""}>
            <FormControl>
              <SelectTrigger className="bg-white border-gray-200">
                <SelectValue placeholder="Selecione a conta" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {bankAccounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.nome_conta} (Saldo: R$ {account.saldo.toFixed(2)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};