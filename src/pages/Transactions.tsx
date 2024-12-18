import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Calendar,
  Clock,
  User,
  Package,
} from "lucide-react";
import NewTransactionForm from "@/components/transactions/NewTransactionForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTransactions } from "@/hooks/useTransactions";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Transactions = () => {
  const [open, setOpen] = useState(false);
  const { transactions, isLoading } = useTransactions();

  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case "Receita":
        return "bg-success hover:bg-success/90";
      case "Despesa":
        return "bg-destructive hover:bg-destructive/90";
      default:
        return "bg-primary hover:bg-primary/90";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-success/20 text-success hover:bg-success/30";
      case "Programado":
        return "bg-warning/20 text-warning hover:bg-warning/30";
      default:
        return "bg-primary/20 text-primary hover:bg-primary/30";
    }
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
  };

  const handleTransactionClick = (transaction: any) => {
    // TODO: Implement edit functionality
    console.log("Edit transaction:", transaction);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Renda Familiar
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie suas receitas e despesas de forma organizada.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-sm bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Nova Transação</DialogTitle>
              <DialogDescription>
                Preencha os dados da nova transação abaixo.
              </DialogDescription>
            </DialogHeader>
            <NewTransactionForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="overflow-hidden shadow-md bg-gradient-to-br from-white to-gray-50">
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    Vencimento
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    Item
                  </div>
                </TableHead>
                <TableHead className="text-left">Valor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    Regularidade
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Responsável
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span>Carregando...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">Nenhuma transação registrada</p>
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id} 
                    className="hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {formatDate(transaction.date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        {transaction.Item || '-'}
                      </div>
                    </TableCell>
                    <TableCell className="text-left">
                      {formatCurrency(transaction.valor)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(transaction.tipo)}>
                        {transaction.tipo === "Receita" ? (
                          <ArrowUpCircle className="w-3 h-3 mr-1 inline" />
                        ) : (
                          <ArrowDownCircle className="w-3 h-3 mr-1 inline" />
                        )}
                        {transaction.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {transaction.regularidade || '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {transaction.responsavel || '-'}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Transactions;