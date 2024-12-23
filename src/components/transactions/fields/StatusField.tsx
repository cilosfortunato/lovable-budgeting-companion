import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Clock, CircleDollarSign } from "lucide-react";

export const StatusField = ({ form }: { form: any }) => {
  const tipoTransacao = form.watch("tipo");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pago":
      case "Recebido":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "Programado":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <CircleDollarSign className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            {getStatusIcon(field.value)}
            Status
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-primary text-white border-0 text-center">
                <SelectValue placeholder="Selecione o status" className="text-center" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Programado" className="text-center">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-warning" />
                  Programado
                </span>
              </SelectItem>
              {tipoTransacao === "Despesa" ? (
                <SelectItem value="Pago" className="text-center">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Pago
                  </span>
                </SelectItem>
              ) : (
                <SelectItem value="Recebido" className="text-center">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Recebido
                  </span>
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};