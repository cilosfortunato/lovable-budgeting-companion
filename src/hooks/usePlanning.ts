import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

type ShoppingPlan = Tables<"planejamento">;

export const usePlanning = () => {
  const queryClient = useQueryClient();

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["planejamento"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("planejamento")
        .select(`
          *,
          categoria:categorias(name),
          subcategoria:subcategorias(nome)
        `)
        .order("expected_date", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const createPlan = useMutation({
    mutationFn: async (newPlan: Omit<ShoppingPlan, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("planejamento")
        .insert(newPlan)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["planejamento"] });
      toast.success("Planejamento criado com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao criar planejamento:", error);
      toast.error("Erro ao criar planejamento. Por favor, tente novamente.");
    },
  });

  return {
    plans,
    isLoading,
    createPlan,
  };
};