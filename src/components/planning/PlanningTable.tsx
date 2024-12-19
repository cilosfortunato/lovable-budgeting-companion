import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface PlanningTableProps {
  items: any[];
}

export const PlanningTable = ({ items = [] }: PlanningTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "planejado":
        return "bg-primary text-primary-foreground";
      case "em andamento":
        return "bg-warning text-warning-foreground";
      case "concluído":
        return "bg-success text-success-foreground";
      case "cancelado":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "alta":
        return "bg-destructive/10 text-destructive border-destructive";
      case "média":
        return "bg-warning/10 text-warning border-warning";
      case "baixa":
        return "bg-success/10 text-success border-success";
      default:
        return "bg-secondary/10 text-secondary border-secondary";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead>Item</TableHead>
          <TableHead>Valor Estimado</TableHead>
          <TableHead>Economizado</TableHead>
          <TableHead>Progresso</TableHead>
          <TableHead>Prioridade</TableHead>
          <TableHead>Data Prevista</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} className="hover:bg-muted/50 cursor-pointer">
            <TableCell className="font-medium">{item.item}</TableCell>
            <TableCell>{formatCurrency(item.estimated_value)}</TableCell>
            <TableCell>{formatCurrency(item.saved_amount)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-primary rounded-full h-2.5"
                    style={{
                      width: `${Math.min(
                        (item.saved_amount / item.estimated_value) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {((item.saved_amount / item.estimated_value) * 100).toFixed(1)}%
                </span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={getPriorityColor(item.priority)}>
                {item.priority}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(item.expected_date).toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};