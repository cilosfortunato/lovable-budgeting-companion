import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useTransactions } from "@/hooks/useTransactions";
import { toast } from "sonner";
import { BasicFields } from "./fields/BasicFields";
import { InstallmentFields } from "./fields/InstallmentFields";
import { ResponsibleField } from "./fields/ResponsibleField";
import { DescriptionField } from "./fields/DescriptionField";
import { useAuth } from "@/components/auth/AuthProvider";
import { StatusField } from "./fields/StatusField";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BankAccountField } from "./fields/BankAccountField";

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
  categoria_id: z.string().nullable(),
  subcategoria_id: z.string().nullable(),
  conta_bancaria_id: z.string().optional(),
});

interface NewTransactionFormProps {
  onSuccess: () => void;
}

const NewTransactionForm = ({ onSuccess }: NewTransactionFormProps) => {
  const { createTransaction } = useTransactions();
  const { session } = useAuth();

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "Despesa",
      status: "Programado",
      date: new Date().toISOString().split("T")[0],
      parcelado: false,
      regularidade: "Único",
      categoria_id: null,
      subcategoria_id: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user) {
      toast.error("Usuário não autenticado");
      return;
    }

    try {
      await createTransaction.mutateAsync({
        tipo: values.tipo,
        valor: parseFloat(values.valor),
        descricao: values.descricao,
        date: values.date,
        status: values.status,
        parcelas: values.parcelado ? parseInt(values.parcelas || "0") : 0,
        regularidade: values.regularidade || "Único",
        observacoes: values.observacoes,
        responsavel: values.responsavel,
        categoria_id: null,
        subcategoria_id: null,
        url_anexos: null,
        Item: values.descricao,
        familia_id: null,
        conta_bancaria_id: values.conta_bancaria_id || null,
      });

      onSuccess();
      toast.success("Transação criada com sucesso!");
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error("Erro ao criar transação. Por favor, tente novamente.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
        <div className="bg-white/50 p-6 rounded-lg shadow-sm space-y-6">
          <div className="space-y-4">
            <DescriptionField form={form} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <BasicFields form={form} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatusField form={form} />
              <ResponsibleField form={form} familyMembers={familyMembers} />
              <BankAccountField form={form} />
            </div>

            <div className="col-span-1">
              <InstallmentFields form={form} />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5"
        >
          Salvar Transação
        </Button>
      </form>
    </Form>
  );
};

export default NewTransactionForm;