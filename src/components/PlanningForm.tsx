import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PlanningFormFields } from "./planning/PlanningFormFields";
import { usePlanning } from "@/hooks/usePlanning";
import { useUser } from "@supabase/auth-helpers-react";

const formSchema = z.object({
  item: z.string().min(3, "Nome do item deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  estimated_value: z.string().min(1, "Valor estimado é obrigatório"),
  priority: z.string().min(1, "Prioridade é obrigatória"),
  expected_date: z.string().min(1, "Data prevista é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
  saved_amount: z.string().min(1, "Valor economizado é obrigatório"),
});

interface PlanningFormProps {
  onSuccess: () => void;
}

const PlanningForm = ({ onSuccess }: PlanningFormProps) => {
  const { createPlan } = usePlanning();
  const user = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: "",
      description: "",
      estimated_value: "",
      priority: "",
      expected_date: new Date().toISOString().split("T")[0],
      status: "Planejado",
      saved_amount: "0",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;

    await createPlan.mutateAsync({
      user_id: user.id,
      item: values.item,
      description: values.description || null,
      estimated_value: parseFloat(values.estimated_value),
      priority: values.priority,
      expected_date: values.expected_date,
      status: values.status,
      saved_amount: parseFloat(values.saved_amount),
      familia_id: null, // This will be set by the database trigger
    });

    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[70vh] overflow-y-auto px-4">
        <PlanningFormFields form={form} />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          Salvar
        </Button>
      </form>
    </Form>
  );
};

export default PlanningForm;