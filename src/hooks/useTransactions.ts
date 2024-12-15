import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

type Transaction = Tables<"transacoes">;

export const useTransactions = () => {
  const queryClient = useQueryClient();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transacoes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transacoes")
        .select(`
          *,
          account:accounts(name),
          categoria:categorias(name),
          subcategoria:subcategorias(nome)
        `)
        .order("date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createTransaction = useMutation({
    mutationFn: async (newTransaction: Omit<Transaction, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("transacoes")
        .insert(newTransaction)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
      toast.success("Transação criada com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao criar transação:", error);
      toast.error("Erro ao criar transação. Por favor, tente novamente.");
    },
  });

  const updateTransaction = useMutation({
    mutationFn: async (transaction: Partial<Transaction> & { id: string }) => {
      const { data, error } = await supabase
        .from("transacoes")
        .update(transaction)
        .eq("id", transaction.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
      toast.success("Transação atualizada com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao atualizar transação:", error);
      toast.error("Erro ao atualizar transação. Por favor, tente novamente.");
    },
  });

  const deleteTransaction = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("transacoes")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
      toast.success("Transação excluída com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao excluir transação:", error);
      toast.error("Erro ao excluir transação. Por favor, tente novamente.");
    },
  });

  return {
    transactions,
    isLoading,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};