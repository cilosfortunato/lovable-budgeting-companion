import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tag } from "lucide-react";

export const StatusField = ({ form }: { form: any }) => {
  const tipoTransacao = form.watch("tipo");

  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            Status
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-white border-gray-200 focus:border-primary focus:ring-primary">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Programado">Programado</SelectItem>
              {tipoTransacao === "Despesa" ? (
                <SelectItem value="Pago">Pago</SelectItem>
              ) : (
                <SelectItem value="Recebido">Recebido</SelectItem>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};