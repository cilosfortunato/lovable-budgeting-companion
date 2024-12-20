import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User } from "lucide-react";

export const ResponsibleField = ({ form }: { form: any }) => {
  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .order("full_name");
      return data || [];
    },
  });

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
              {profiles.map((profile) => (
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