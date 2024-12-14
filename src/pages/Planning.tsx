import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PlanningForm from "@/components/PlanningForm";
import { PlanningHeader } from "@/components/planning/PlanningHeader";
import { PlanningTable } from "@/components/planning/PlanningTable";

const Planning = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [items] = useState([
    {
      id: 1,
      item: "MacBook Pro",
      category: "electronics",
      estimatedValue: "12000",
      priority: "Alta",
      expectedDate: "2024-06-01",
      status: "planned",
      savedAmount: "3000",
    },
    // Add more mock items as needed
  ]);

  return (
    <div className="container mx-auto py-4 space-y-4">
      <PlanningHeader onAddNew={() => setIsDialogOpen(true)} />
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <PlanningTable items={items} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
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