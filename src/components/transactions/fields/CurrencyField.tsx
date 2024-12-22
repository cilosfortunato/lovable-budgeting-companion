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
    // Remove all non-numeric characters except comma
    let value = e.target.value.replace(/[^\d,]/g, "");
    
    // Replace comma with dot for calculation
    value = value.replace(",", ".");
    
    // Convert to number considering the last 2 digits as cents
    const parts = value.split(".");
    let numericValue: number;
    
    if (parts.length > 1) {
      // If there's a decimal part
      const integerPart = parts[0] || "0";
      const decimalPart = parts[1].slice(0, 2).padEnd(2, "0");
      numericValue = parseFloat(`${integerPart}.${decimalPart}`);
    } else {
      // If it's a whole number, convert to cents
      numericValue = parseFloat(value) / 100;
    }

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