import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PlanningForm from "@/components/PlanningForm";
import { PlanningHeader } from "@/components/planning/PlanningHeader";
import { PlanningTable } from "@/components/planning/PlanningTable";
import { usePlanning } from "@/hooks/usePlanning";
import { Card } from "@/components/ui/card";

const Planning = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { plans, isLoading } = usePlanning();

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <PlanningHeader onAddNew={() => setIsDialogOpen(true)} />
      
      <Card className="mt-6 overflow-hidden shadow-md bg-gradient-to-br from-white to-gray-50">
        <div className="relative overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span className="text-muted-foreground">Carregando...</span>
              </div>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum planejamento encontrado</p>
            </div>
          ) : (
            <PlanningTable items={plans} />
          )}
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Novo Planejamento</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo planejamento abaixo.
            </DialogDescription>
          </DialogHeader>
          <PlanningForm onSuccess={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Planning;