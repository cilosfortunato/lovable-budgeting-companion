import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useTransactions } from "@/hooks/useTransactions";
import { useUser } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { BasicFields } from "./fields/BasicFields";
import { CategoryFields } from "./fields/CategoryFields";
import { InstallmentFields } from "./fields/InstallmentFields";
import { AccountField } from "./fields/AccountField";
import { ResponsibleField } from "./fields/ResponsibleField";

const formSchema = z.object({
  responsavel: z.string().min(1, "Responsável é obrigatório"),
  descricao: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
  valor: z.string().min(1, "Valor é obrigatório"),
  tipo: z.enum(["Receita", "Despesa"]),
  status: z.enum(["Pago", "Programado"]),
  date: z.string().min(1, "Data é obrigatória"),
  parcelado: z.boolean().default(false),
  parcelas: z.string().optional(),
  regularidade: z.enum(["Único", "Semanal", "Trimestral", "Mensal", "Anual"]).optional(),
  observacoes: z.string().optional(),
  categoria_id: z.string().min(1, "Categoria é obrigatória"),
  subcategoria_id: z.string().min(1, "Subcategoria é obrigatória"),
  account_id: z.string().min(1, "Conta é obrigatória"),
});

interface NewTransactionFormProps {
  onSuccess: () => void;
}

const NewTransactionForm = ({ onSuccess }: NewTransactionFormProps) => {
  const { createTransaction } = useTransactions();
  const user = useUser();

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
      account_id: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast.error("Usuário não autenticado");
      return;
    }

    try {
      await createTransaction.mutateAsync({
        user_id: user.id,
        tipo: values.tipo,
        valor: parseFloat(values.valor),
        descricao: values.descricao,
        date: values.date,
        status: values.status,
        parcelas: values.parcelado ? parseInt(values.parcelas || "0") : 0,
        regularidade: values.regularidade || "Único",
        observacoes: values.observacoes,
        responsavel: values.responsavel,
        categoria_id: values.categoria_id,
        subcategoria_id: values.subcategoria_id,
        account_id: values.account_id,
        url_anexos: null,
      });

      toast.success("Transação criada com sucesso!");
      onSuccess();
    } catch (error) {
      toast.error("Erro ao criar transação");
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResponsibleField form={form} />
          <BasicFields form={form} />
          <CategoryFields form={form} />
          <AccountField form={form} />
        </div>
        <InstallmentFields form={form} />
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </Form>
  );
};

export default NewTransactionForm;