import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DescriptionField } from "./fields/DescriptionField";
import { CurrencyField } from "./fields/CurrencyField";
import { TypeField } from "./fields/TypeField";
import { StatusField } from "./fields/StatusField";
import { ResponsibleField } from "./fields/ResponsibleField";
import { InstallmentFields } from "./fields/InstallmentFields";
import { BankAccountField } from "./fields/BankAccountField";
import { Textarea } from "@/components/ui/textarea";
import { AlignLeft } from "lucide-react";

const regularidadeEnum = ["Único", "Semanal", "Trimestral", "Mensal", "Anual"] as const;
type RegularidadeType = typeof regularidadeEnum[number];

const formSchema = z.object({
  responsavel: z.string().min(1, "Responsável é obrigatório"),
  descricao: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
  valor: z.string().min(1, "Valor é obrigatório"),
  tipo: z.enum(["Receita", "Despesa"]),
  status: z.enum(["Pago", "Programado", "Recebido"]),
  date: z.string().min(1, "Data é obrigatória"),
  parcelado: z.boolean().default(false),
  parcelas: z.string().optional(),
  regularidade: z.enum(["Único", "Semanal", "Trimestral", "Mensal", "Anual"]).optional(),
  observacoes: z.string().optional(),
  categoria_id: z.string().default("automatica"),
  subcategoria_id: z.string().default("automatica"),
  conta_bancaria_id: z.string().optional(),
});

interface TransactionFormFieldsProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
  planningId?: string;
}

export const TransactionFormFields = ({ onSubmit, defaultValues, planningId }: TransactionFormFieldsProps) => {
  const { data: familyMembers = [] } = useQuery({
    queryKey: ["familyMembers"],
    queryFn: async () => {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("full_name")
        .order("full_name");
      return profiles || [];
    },
  });

  const { data: planningData } = useQuery({
    queryKey: ["planning", planningId],
    queryFn: async () => {
      if (!planningId) return null;
      const { data } = await supabase
        .from("planejamento")
        .select("*")
        .eq("id", planningId)
        .single();
      return data;
    },
    enabled: !!planningId,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "Despesa",
      status: "Programado",
      date: new Date().toISOString().split("T")[0],
      parcelado: false,
      regularidade: "Único",
      categoria_id: "automatica",
      subcategoria_id: "automatica",
      ...defaultValues,
      ...(planningData && {
        descricao: planningData.item,
        valor: planningData.estimated_value.toString(),
        observacoes: planningData.observacoes,
        parcelas: planningData.parcelas?.toString(),
        regularidade: planningData.regularidade as RegularidadeType,
      }),
    },
  });

  const isParcelado = form.watch("parcelado");

  useEffect(() => {
    if (!isParcelado) {
      form.setValue("parcelas", undefined);
      form.setValue("regularidade", "Único");
    }
  }, [isParcelado, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <DescriptionField form={form} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CurrencyField form={form} defaultValue={defaultValues?.valor} />
            <TypeField form={form} />
            <StatusField form={form} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResponsibleField form={form} familyMembers={familyMembers} />
            <BankAccountField form={form} />
          </div>

          <FormField
            control={form.control}
            name="observacoes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <AlignLeft className="h-4 w-4 text-primary" />
                  Observações
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Digite suas observações" 
                    {...field}
                    className="bg-white border-gray-200 focus:border-primary focus:ring-primary resize-none h-24"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <InstallmentFields form={form} />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5"
        >
          Salvar
        </Button>
      </form>
    </Form>
  );
};
