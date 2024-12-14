import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PlanningHeaderProps {
  onAddNew: () => void;
}

export const PlanningHeader = ({ onAddNew }: PlanningHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 bg-white rounded-lg shadow-sm">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Planejamento</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie seus planos de compras e economias
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Buscar planejamentos..."
            className="w-[250px]"
            type="search"
          />
          <Button variant="outline">
            <span className="hidden md:inline">Exportar</span>
          </Button>
        </div>
        <Button onClick={onAddNew} className="bg-primary">
          Adicionar Novo
        </Button>
      </div>
    </div>
  );
};