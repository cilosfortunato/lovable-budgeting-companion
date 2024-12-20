import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FileText, Calendar } from "lucide-react";

export const InstallmentFields = ({ form }: { form: any }) => {
  const isParcelado = form.watch("parcelado");

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="parcelado"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Parcelado</FormLabel>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {isParcelado && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <FormField
            control={form.control}
            name="parcelas"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4 text-primary" />
                  Quantas parcelas?
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="60"
                    placeholder="Número de parcelas"
                    className="bg-white border-gray-200 focus:border-primary focus:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="regularidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4 text-primary" />
                  Regularidade
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white border-gray-200 focus:border-primary focus:ring-primary">
                      <SelectValue placeholder="Selecione a regularidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Único">Único</SelectItem>
                    <SelectItem value="Semanal">Semanal</SelectItem>
                    <SelectItem value="Trimestral">Trimestral</SelectItem>
                    <SelectItem value="Mensal">Mensal</SelectItem>
                    <SelectItem value="Anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="observacoes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4 text-primary" />
                  Observações
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Digite as observações"
                    className="bg-white border-gray-200 focus:border-primary focus:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};