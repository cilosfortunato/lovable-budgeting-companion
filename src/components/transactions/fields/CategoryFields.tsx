import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tag } from "lucide-react";

export const CategoryFields = ({ form }: { form: any }) => {
  const { data: categorias = [] } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => {
      const { data } = await supabase
        .from("categorias")
        .select("id, nome")
        .order("nome");
      return [{ id: "automatica", nome: "Automática" }, ...(data || [])];
    },
  });

  const { data: subcategorias = [] } = useQuery({
    queryKey: ["subcategorias"],
    queryFn: async () => {
      const { data } = await supabase
        .from("subcategorias")
        .select("id, nome")
        .order("nome");
      return [{ id: "automatica", nome: "Automática" }, ...(data || [])];
    },
  });

  return (
    <>
      <FormField
        control={form.control}
        name="categoria_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Categoria
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subcategoria_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Subcategoria
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a subcategoria" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {subcategorias.map((subcategoria) => (
                  <SelectItem key={subcategoria.id} value={subcategoria.id}>
                    {subcategoria.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};