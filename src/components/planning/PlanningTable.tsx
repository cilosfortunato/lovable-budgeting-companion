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
    switch (status) {
      case "planned":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "acquired":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Valor Estimado</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Data Prevista</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Valor Economizado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.item}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{formatCurrency(item.estimatedValue)}</TableCell>
              <TableCell>
                <Badge variant="outline">{item.priority}</Badge>
              </TableCell>
              <TableCell>{new Date(item.expectedDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
              </TableCell>
              <TableCell>{formatCurrency(item.savedAmount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};