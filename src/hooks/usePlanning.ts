import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";
import { useEffect } from "react";

type ShoppingPlan = Tables<"planejamento">;

export const usePlanning = () => {
  const queryClient = useQueryClient();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Você precisa estar logado para acessar o planejamento");
      }
    };
    checkAuth();
  }, []);

  const { data: plans = [], isLoading, error } = useQuery({
    queryKey: ["planejamento"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("planejamento")
          .select(`
            *,
            categoria:categorias(id, nome),
            subcategoria:subcategorias(id, nome)
          `)
          .order("expected_date", { ascending: true });

        if (error) {
          console.error("Error fetching planning data:", error);
          throw error;
        }

        return data || [];
      } catch (error) {
        console.error("Error in planning query:", error);
        toast.error("Erro ao carregar planejamentos. Por favor, tente novamente.");
        throw error;
      }
    },
    retry: 2, // Retry failed requests up to 2 times
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
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
    error,
    createPlan,
  };
};