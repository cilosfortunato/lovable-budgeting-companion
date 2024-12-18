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
import { Plus, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import TransactionForm from "@/components/TransactionForm";
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

const Transactions = () => {
  const [openOld, setOpenOld] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const { transactions, isLoading } = useTransactions();

  const getTypeColor = (tipo: string) => {
    return tipo === "Receita" ? "bg-success" : "bg-destructive";
  };

  const getStatusColor = (status: string) => {
    return status === "Pago" ? "bg-success/20 text-success" : "bg-warning/20 text-warning";
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Transações
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie suas receitas e despesas de forma organizada.
          </p>
        </div>
        <div className="space-x-2">
          <Dialog open={openNew} onOpenChange={setOpenNew}>
            <DialogTrigger asChild>
              <Button variant="outline" className="shadow-sm">
                <Plus className="w-4 h-4 mr-2" />
                Inserir transação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Inserir Transação</DialogTitle>
                <DialogDescription>
                  Preencha os dados da nova transação abaixo.
                </DialogDescription>
              </DialogHeader>
              <NewTransactionForm onSuccess={() => setOpenNew(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={openOld} onOpenChange={setOpenOld}>
            <DialogTrigger asChild>
              <Button className="shadow-sm">
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
              <TransactionForm onSuccess={() => setOpenOld(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card className="overflow-hidden shadow-md">
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Parcelas</TableHead>
                <TableHead>Regularidade</TableHead>
                <TableHead>Observações</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span>Carregando...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <p className="text-muted-foreground">Nenhuma transação registrada</p>
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
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
                    <TableCell>{transaction.responsavel}</TableCell>
                    <TableCell>{transaction.descricao}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.parcelas || '-'}</TableCell>
                    <TableCell>{transaction.regularidade || '-'}</TableCell>
                    <TableCell>{transaction.observacoes || '-'}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(transaction.valor)}
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