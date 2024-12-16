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
          categoria:categorias(name),
          subcategoria:subcategorias(nome),
          account:accounts(name)
        `)
        .eq('user_id', user.id)
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }

      return data || [];
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

  return {
    transactions,
    isLoading,
    error,
    createTransaction,
  };
};