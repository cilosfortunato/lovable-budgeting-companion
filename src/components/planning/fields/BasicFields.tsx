import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSign, Calendar } from "lucide-react";

export const BasicFields = ({ form }: { form: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="item"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">Item</FormLabel>
            <FormControl>
              <Input placeholder="Nome do item" {...field} className="bg-white border-gray-200 focus:border-primary focus:ring-primary" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="estimated_value"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Valor Estimado
            </FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01" 
                placeholder="R$ 0,00" 
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
        name="expected_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Data Prevista
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
    </div>
  );
};