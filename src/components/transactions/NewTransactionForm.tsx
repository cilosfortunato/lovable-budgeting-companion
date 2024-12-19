import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useTransactions } from "@/hooks/useTransactions";
import { toast } from "sonner";
import { BasicFields } from "./fields/BasicFields";
import { CategoryFields } from "./fields/CategoryFields";
import { InstallmentFields } from "./fields/InstallmentFields";
import { ResponsibleField } from "./fields/ResponsibleField";
import { DescriptionField } from "./fields/DescriptionField";
import { useAuth } from "@/components/auth/AuthProvider";

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
});

interface NewTransactionFormProps {
  onSuccess: () => void;
}

const NewTransactionForm = ({ onSuccess }: NewTransactionFormProps) => {
  const { createTransaction } = useTransactions();
  const { session } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "Despesa",
      status: "Programado",
      date: new Date().toISOString().split("T")[0],
      parcelado: false,
      regularidade: "Único",
      categoria_id: "",
      subcategoria_id: "",
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
        categoria_id: values.categoria_id,
        subcategoria_id: values.subcategoria_id,
        url_anexos: null,
        Item: values.descricao,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <DescriptionField form={form} />
          </div>
          <div className="col-span-1">
            <BasicFields form={form} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResponsibleField form={form} />
          <CategoryFields form={form} />
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