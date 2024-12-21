import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";

interface ResponsibleFieldProps {
  form: any;
  familyMembers: Array<{ full_name: string }>;
}

export const ResponsibleField = ({ form, familyMembers }: ResponsibleFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="responsavel"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-sm font-medium">
            <User className="h-4 w-4 text-primary" />
            Responsável
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-white border-gray-200 focus:border-primary focus:ring-primary">
                <SelectValue placeholder="Selecione o responsável" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {familyMembers.map((profile) => (
                <SelectItem key={profile.full_name} value={profile.full_name}>
                  {profile.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};