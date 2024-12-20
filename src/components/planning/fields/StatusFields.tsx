import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export const StatusFields = ({ form }: { form: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="priority"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-primary" />
              Prioridade
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Alta">Alta</SelectItem>
                <SelectItem value="Média">Média</SelectItem>
                <SelectItem value="Baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Status
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Planejado">Planejado</SelectItem>
                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};