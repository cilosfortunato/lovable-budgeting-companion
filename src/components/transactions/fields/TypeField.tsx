import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export const TypeField = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="tipo"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            {field.value === "Receita" ? (
              <ArrowUpCircle className="h-4 w-4 text-success" />
            ) : (
              <ArrowDownCircle className="h-4 w-4 text-destructive" />
            )}
            Tipo
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-primary text-white border-0 text-center">
                <SelectValue placeholder="Selecione o tipo" className="text-center" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Receita" className="text-center">
                <span className="flex items-center gap-2">
                  <ArrowUpCircle className="h-4 w-4 text-success" />
                  Receita
                </span>
              </SelectItem>
              <SelectItem value="Despesa" className="text-center">
                <span className="flex items-center gap-2">
                  <ArrowDownCircle className="h-4 w-4 text-destructive" />
                  Despesa
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};