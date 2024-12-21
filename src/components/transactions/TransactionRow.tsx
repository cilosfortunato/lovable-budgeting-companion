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
  Check,
  CheckCircle2,
  Circle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { EditTransactionForm } from "./EditTransactionForm";
import { useTransactions } from "@/hooks/useTransactions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
    if ((e.target as HTMLElement).closest('.status-badge, .status-button')) {
      return;
    }
    setIsEditing(true);
  };

  const handleStatusClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (transaction.status === "Programado") {
      try {
        const newStatus = transaction.tipo === "Despesa" ? "Pago" : "Recebido";
        await updateTransaction.mutateAsync({
          ...transaction,
          status: newStatus
        });
        toast.success("Status atualizado com sucesso!");
        onUpdate();
      } catch (error) {
        toast.error("Erro ao atualizar status");
      }
    }
  };

  const StatusIcon = () => {
    if (transaction.status === "Programado") {
      return <Circle className="w-5 h-5 text-warning transition-all duration-200" />;
    }
    return <CheckCircle2 className="w-5 h-5 text-success transition-all duration-200" />;
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
            <Button 
              variant="ghost" 
              size="icon"
              className="status-button h-8 w-8 p-0"
              onClick={handleStatusClick}
              disabled={transaction.status !== "Programado"}
            >
              <StatusIcon />
            </Button>
            <Badge 
              className={`status-badge ${getStatusColor(transaction.status)}`}
            >
              {transaction.status}
            </Badge>
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