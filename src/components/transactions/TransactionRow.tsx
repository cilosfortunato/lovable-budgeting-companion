import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  ArrowUpCircle, 
  ArrowDownCircle,
  Calendar,
  Clock,
  User,
  Package,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditTransactionForm } from "./EditTransactionForm";
import { useTransactions } from "@/hooks/useTransactions";
import { toast } from "sonner";

interface TransactionRowProps {
  transaction: any;
  onUpdate: () => void;
}

export const TransactionRow = ({ transaction, onUpdate }: TransactionRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateTransaction } = useTransactions();
  const rowRef = useRef<HTMLTableRowElement>(null);

  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case "Receita":
        return "bg-success text-white hover:bg-success/90";
      case "Despesa":
        return "bg-destructive text-white hover:bg-destructive/90";
      default:
        return "bg-primary text-white hover:bg-primary/90";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
      case "Recebido":
        return "bg-success/90 text-white hover:bg-success";
      case "Programado":
        return "bg-warning/90 text-white hover:bg-warning";
      default:
        return "bg-primary/90 text-white hover:bg-primary";
    }
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
  };

  const handleRowClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.status-select')) {
      return;
    }
    setIsEditing(true);
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateTransaction.mutateAsync({
        ...transaction,
        status: newStatus
      });
      toast.success("Status atualizado com sucesso!");
      onUpdate();
    } catch (error) {
      toast.error("Erro ao atualizar status");
    }
  };

  return (
    <>
      <tr 
        ref={rowRef}
        className="hover:bg-muted/50 transition-colors cursor-pointer"
        onClick={handleRowClick}
      >
        <td className="p-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            {formatDate(transaction.date)}
          </div>
        </td>
        <td>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            {transaction.Item || '-'}
          </div>
        </td>
        <td className="text-left">
          {formatCurrency(transaction.valor)}
        </td>
        <td>
          <Badge className={getTypeColor(transaction.tipo)}>
            {transaction.tipo === "Receita" ? (
              <ArrowUpCircle className="w-3 h-3 mr-1 inline" />
            ) : (
              <ArrowDownCircle className="w-3 h-3 mr-1 inline" />
            )}
            {transaction.tipo}
          </Badge>
        </td>
        <td>
          <div className="flex items-center gap-2">
            <Select
              value={transaction.status}
              onValueChange={handleStatusChange}
              className="status-select min-w-[140px]"
            >
              <SelectTrigger className={`w-full ${getStatusColor(transaction.status)}`}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Programado">Programado</SelectItem>
                {transaction.tipo === "Despesa" ? (
                  <SelectItem value="Pago">Pago</SelectItem>
                ) : (
                  <SelectItem value="Recebido">Recebido</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </td>
        <td>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            {transaction.regularidade || '-'}
          </div>
        </td>
        <td>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            {transaction.responsavel || '-'}
          </div>
        </td>
      </tr>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editar Transação</DialogTitle>
            <DialogDescription>
              Faça as alterações necessárias na transação abaixo.
            </DialogDescription>
          </DialogHeader>
          <EditTransactionForm 
            transaction={transaction} 
            onSuccess={() => {
              setIsEditing(false);
              onUpdate();
            }} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};