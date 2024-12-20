import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlignLeft } from "lucide-react";

export const DescriptionField = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="descricao"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-sm font-medium">
            <AlignLeft className="h-4 w-4 text-primary" />
            Descrição
          </FormLabel>
          <FormControl>
            <Input 
              placeholder="Digite uma descrição" 
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