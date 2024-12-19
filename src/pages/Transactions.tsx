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
import { TransactionRow } from "@/components/transactions/TransactionRow";

const Transactions = () => {
  const [open, setOpen] = useState(false);
  const { transactions, isLoading } = useTransactions();

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
                <TableHead>Data</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-left">Valor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Regularidade</TableHead>
                <TableHead>Responsável</TableHead>
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
                  <TransactionRow 
                    key={transaction.id} 
                    transaction={transaction}
                    onUpdate={() => {
                      // Transaction list will be automatically updated by React Query
                    }}
                  />
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
