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
          <FormLabel className="flex items-center gap-2">
            <AlignLeft className="h-4 w-4" />
            Descrição
          </FormLabel>
          <FormControl>
            <Input placeholder="Digite uma descrição" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};