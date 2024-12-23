import { BasicFields } from "./fields/BasicFields";
import { StatusFields } from "./fields/StatusFields";
import { DescriptionField } from "./fields/DescriptionField";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

export const PlanningFormFields = ({ form }: { form: any }) => {
  return (
    <div className="space-y-6">
      <BasicFields form={form} />
      
      <FormField
        control={form.control}
        name="saved_amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Valor Guardado
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
      
      <StatusFields form={form} />
      <DescriptionField form={form} />
    </div>
  );
};