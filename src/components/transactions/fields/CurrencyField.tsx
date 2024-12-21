import { useState, useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

export const CurrencyField = ({ form, defaultValue }: { form: any; defaultValue?: string }) => {
  const [formattedValue, setFormattedValue] = useState("");

  useEffect(() => {
    if (defaultValue) {
      const numericValue = parseFloat(defaultValue);
      formatValue(numericValue);
    }
  }, [defaultValue]);

  const formatValue = (value: number) => {
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
    setFormattedValue(formattedValue);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    const numericValue = parseInt(value) / 100;
    formatValue(numericValue);
    form.setValue("valor", numericValue.toString());
  };

  return (
    <FormField
      control={form.control}
      name="valor"
      render={({ field: { onChange, ...field } }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            Valor
          </FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="R$ 0,00"
              value={formattedValue || field.value}
              onChange={handleValueChange}
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