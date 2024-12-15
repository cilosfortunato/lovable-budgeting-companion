import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PlanningForm from "@/components/PlanningForm";
import { PlanningHeader } from "@/components/planning/PlanningHeader";
import { PlanningTable } from "@/components/planning/PlanningTable";
import { usePlanning } from "@/hooks/usePlanning";

const Planning = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { plans, isLoading } = usePlanning();

  return (
    <div className="container mx-auto py-4 space-y-4">
      <PlanningHeader onAddNew={() => setIsDialogOpen(true)} />
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        {isLoading ? (
          <div className="text-center py-4">Carregando...</div>
        ) : (
          <PlanningTable items={plans} />
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Novo Planejamento</DialogTitle>
          </DialogHeader>
          <PlanningForm onSuccess={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Planning;