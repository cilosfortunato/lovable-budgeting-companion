import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";
import { useUser } from "@supabase/auth-helpers-react";

type Transaction = Tables<"transacoes">;

export const useTransactions = () => {
  const queryClient = useQueryClient();
  const user = useUser();

  const { data: transactions = [], isLoading, error } = useQuery({
    queryKey: ["transacoes"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("transacoes")
        .select(`
          *,
          account:accounts(name),
          categoria:categorias(name),
          subcategoria:subcategorias(nome)
        `)
        .eq('user_id', user.id)
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }

      if (!data) {
        return [];
      }

      return data;
    },
    enabled: !!user,
  });

  const createTransaction = useMutation({
    mutationFn: async (newTransaction: Omit<Transaction, "id" | "created_at">) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("transacoes")
        .insert(newTransaction)
        .select()
        .single();

      if (error) {
        console.error("Error creating transaction:", error);
        throw error;
      }

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
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("transacoes")
        .update(transaction)
        .eq("id", transaction.id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating transaction:", error);
        throw error;
      }

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
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from("transacoes")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error deleting transaction:", error);
        throw error;
      }
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
    error,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};