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
import { Plus } from "lucide-react";
import TransactionForm from "@/components/TransactionForm";
import NewTransactionForm from "@/components/transactions/NewTransactionForm";
import {
  Dialog,
  DialogContent,
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

  return (
    <div className="container max-w-7xl mx-auto px-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transações</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie suas receitas e despesas de forma organizada.
          </p>
        </div>
        <div className="space-x-2">
          <Dialog open={openNew} onOpenChange={setOpenNew}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Inserir transação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Inserir Transação</DialogTitle>
              </DialogHeader>
              <NewTransactionForm onSuccess={() => setOpenNew(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={openOld} onOpenChange={setOpenOld}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Transação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Nova Transação</DialogTitle>
              </DialogHeader>
              <TransactionForm onSuccess={() => setOpenOld(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
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
                  <TableCell colSpan={9} className="text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Nenhuma transação registrada
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(transaction.tipo)}>
                        {transaction.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.responsavel}</TableCell>
                    <TableCell>{transaction.descricao}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
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