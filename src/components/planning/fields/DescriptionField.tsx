import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AlignLeft } from "lucide-react";

export const DescriptionField = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <AlignLeft className="h-4 w-4 text-primary" />
            Descrição
          </FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Digite uma descrição" 
              {...field}
              className="bg-white border-gray-200 focus:border-primary focus:ring-primary resize-none h-24"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};