import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DollarSign, ListFilter, Calendar } from "lucide-react";

export const BasicFields = ({ form }: { form: any }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="valor"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-sm font-medium">
              <DollarSign className="h-4 w-4 text-primary" />
              Valor
            </FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01" 
                placeholder="0,00" 
                {...field}
                className="bg-white border-gray-200 focus:border-primary focus:ring-primary"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tipo"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-sm font-medium">
              <ListFilter className="h-4 w-4 text-primary" />
              Tipo
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-primary text-white border-0">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Receita">Receita</SelectItem>
                <SelectItem value="Despesa">Despesa</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4 text-primary" />
              Data
            </FormLabel>
            <FormControl>
              <Input 
                type="date" 
                {...field}
                className="bg-white border-gray-200 focus:border-primary focus:ring-primary"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};