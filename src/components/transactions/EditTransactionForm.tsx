import { useTransactions } from "@/hooks/useTransactions";
import { TransactionFormFields } from "./TransactionFormFields";

interface EditTransactionFormProps {
  transaction: any;
  onSuccess: () => void;
}

export const EditTransactionForm = ({ transaction, onSuccess }: EditTransactionFormProps) => {
  const { updateTransaction } = useTransactions();

  const onSubmit = async (values: any) => {
    await updateTransaction.mutateAsync({
      id: transaction.id,
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
      conta_bancaria_id: values.conta_bancaria_id || null,
    });

    onSuccess();
  };

  const defaultValues = {
    tipo: transaction.tipo,
    valor: transaction.valor.toString(),
    descricao: transaction.descricao,
    categoria_id: transaction.categoria_id,
    subcategoria_id: transaction.subcategoria_id,
    date: transaction.date,
    status: transaction.status,
    parcelas: transaction.parcelas?.toString(),
    regularidade: transaction.regularidade,
    observacoes: transaction.observacoes,
    responsavel: transaction.responsavel,
    conta_bancaria_id: transaction.conta_bancaria_id,
  };

  return <TransactionFormFields onSubmit={onSubmit} defaultValues={defaultValues} />;
};