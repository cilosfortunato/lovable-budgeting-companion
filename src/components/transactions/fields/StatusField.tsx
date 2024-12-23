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
              <SelectTrigger className="bg-primary text-white border-0 text-center">
                <SelectValue placeholder="Selecione o status" className="text-center" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Programado" className="text-center">Programado</SelectItem>
              {tipoTransacao === "Despesa" ? (
                <SelectItem value="Pago" className="text-center">Pago</SelectItem>
              ) : (
                <SelectItem value="Recebido" className="text-center">Recebido</SelectItem>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};