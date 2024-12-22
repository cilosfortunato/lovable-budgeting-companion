import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Package } from "lucide-react";

export const DescriptionField = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="descricao"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-sm font-medium">
            <Package className="h-4 w-4 text-primary" />
            Item
          </FormLabel>
          <FormControl>
            <Input 
              placeholder="Digite o item" 
              {...field}
              className="bg-white border-gray-200 focus:border-primary focus:ring-primary"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};