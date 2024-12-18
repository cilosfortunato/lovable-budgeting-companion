import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

export const ValueField = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="valor"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Valor
          </FormLabel>
          <FormControl>
            <Input type="number" step="0.01" placeholder="0,00" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};