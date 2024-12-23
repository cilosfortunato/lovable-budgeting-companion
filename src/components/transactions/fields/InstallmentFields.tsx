import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export const InstallmentFields = ({ form }: { form: any }) => {
  const isParcelado = form.watch("parcelado");

  return (
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
  );
};