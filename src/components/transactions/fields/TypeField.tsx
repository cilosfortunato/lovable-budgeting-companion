import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListFilter } from "lucide-react";

export const TypeField = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="tipo"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <ListFilter className="h-4 w-4 text-primary" />
            Tipo
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-primary text-white border-0 text-center">
                <SelectValue placeholder="Selecione o tipo" className="text-center" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Receita" className="text-center">Receita</SelectItem>
              <SelectItem value="Despesa" className="text-center">Despesa</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};