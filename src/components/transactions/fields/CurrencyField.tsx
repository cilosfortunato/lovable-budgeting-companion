import { useState, useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

export const CurrencyField = ({ form, defaultValue }: { form: any; defaultValue?: string }) => {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (defaultValue) {
      const numericValue = parseFloat(defaultValue);
      formatAndDisplayValue(numericValue);
    }
  }, [defaultValue]);

  const formatAndDisplayValue = (value: number) => {
    const formatted = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
    setDisplayValue(formatted);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d,]/g, "");
    
    if (value === "") {
      setDisplayValue("");
      form.setValue("valor", "");
      return;
    }

    // Handle comma as decimal separator
    if (value.includes(",")) {
      const parts = value.split(",");
      if (parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
        value = parts.join(",");
      }
    } else {
      // If no comma, treat as whole number
      value = value + ",00";
    }

    // Convert comma to dot for internal value
    const numericValue = parseFloat(value.replace(",", "."));
    
    if (!isNaN(numericValue)) {
      formatAndDisplayValue(numericValue);
      form.setValue("valor", numericValue.toString());
    }
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
              value={displayValue}
              onChange={handleValueChange}
              {...field}
              className="bg-white border-gray-200 focus:border-primary focus:ring-primary text-right"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};