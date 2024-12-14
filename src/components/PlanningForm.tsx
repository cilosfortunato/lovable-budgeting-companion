import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PlanningFormFields } from "./planning/PlanningFormFields";

const formSchema = z.object({
  item: z.string().min(3, "Nome do item deve ter pelo menos 3 caracteres"),
  category: z.string().min(1, "Categoria é obrigatória"),
  description: z.string().optional(),
  estimatedValue: z.string().min(1, "Valor estimado é obrigatório"),
  priority: z.string().min(1, "Prioridade é obrigatória"),
  expectedDate: z.string().min(1, "Data prevista é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
  savedAmount: z.string().min(1, "Valor economizado é obrigatório"),
});

interface PlanningFormProps {
  onSuccess: () => void;
}

const PlanningForm = ({ onSuccess }: PlanningFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: "",
      category: "",
      description: "",
      estimatedValue: "",
      priority: "",
      expectedDate: new Date().toISOString().split("T")[0],
      status: "planned",
      savedAmount: "0",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <PlanningFormFields form={form} />
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </Form>
  );
};

export default PlanningForm;