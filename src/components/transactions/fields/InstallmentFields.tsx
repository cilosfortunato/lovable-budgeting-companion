import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Repeat, Hash } from "lucide-react";

const regularidadeEnum = ["Único", "Semanal", "Trimestral", "Mensal", "Anual"] as const;

export const InstallmentFields = ({ form }: { form: any }) => {
  const isParcelado = form.watch("parcelado");

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="parcelado"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between p-4 bg-white/80 rounded-lg border border-gray-100">
            <div className="space-y-0.5">
              <FormLabel className="text-base font-medium text-gray-900">Parcelado</FormLabel>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {isParcelado && (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="parcelas"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" />
                  Quantas parcelas?
                </FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Número de parcelas" 
                    {...field}
                    className="bg-white border-gray-200 focus:border-primary focus:ring-primary"
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
                <FormLabel className="flex items-center gap-2">
                  <Repeat className="h-4 w-4 text-primary" />
                  Regularidade
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-primary text-white border-0 text-center">
                      <SelectValue placeholder="Selecione a regularidade" className="text-center" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {regularidadeEnum.map((option) => (
                      <SelectItem key={option} value={option} className="text-center">
                        <span className="flex items-center gap-2">
                          <Repeat className="h-4 w-4 text-primary" />
                          {option}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};