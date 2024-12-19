import { useTransactions } from "@/hooks/useTransactions";
import { useUser } from "@supabase/auth-helpers-react";
import { TransactionFormFields } from "./TransactionFormFields";

interface TransactionFormProps {
  onSuccess: () => void;
}

const TransactionForm = ({ onSuccess }: TransactionFormProps) => {
  const { createTransaction } = useTransactions();
  const user = useUser();

  const onSubmit = async (values: any) => {
    if (!user) return;

    await createTransaction.mutateAsync({
      tipo: values.tipo,
      valor: parseFloat(values.valor),
      descricao: values.descricao,
      categoria_id: values.categoria_id,
      subcategoria_id: values.subcategoria_id,
      date: values.date,
      status: values.status,
      parcelas: values.parcelado ? parseInt(values.parcelas) : 0,
      regularidade: values.regularidade || "Único",
      observacoes: values.observacoes || null,
      url_anexos: null,
      responsavel: values.responsavel,
      Item: values.descricao,
      familia_id: null, // This will be set by the database trigger
    });

    onSuccess();
  };

  return <TransactionFormFields onSubmit={onSubmit} />;
};

export default TransactionForm;