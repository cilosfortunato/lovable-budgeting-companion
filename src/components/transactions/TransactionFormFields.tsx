import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsibleField } from "./fields/ResponsibleField";
import { InstallmentFields } from "./fields/InstallmentFields";
import { AlignLeft, DollarSign, Calendar, ListFilter, Tag } from "lucide-react";

const formSchema = z.object({
  responsavel: z.string().min(1, "Responsável é obrigatório"),
  descricao: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
  valor: z.string().min(1, "Valor é obrigatório"),
  tipo: z.enum(["Receita", "Despesa"]),
  status: z.enum(["Pago", "Programado"]),
  date: z.string().min(1, "Data é obrigatória"),
  parcelado: z.boolean().default(false),
  parcelas: z.string().optional(),
  regularidade: z.enum(["Único", "Semanal", "Trimestral", "Mensal", "Anual"]).optional(),
  observacoes: z.string().optional(),
  categoria_id: z.string().default("automatica"),
  subcategoria_id: z.string().default("automatica"),
});

interface TransactionFormFieldsProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
}

export const TransactionFormFields = ({ onSubmit, defaultValues }: TransactionFormFieldsProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "Despesa",
      status: "Programado",
      date: new Date().toISOString().split("T")[0],
      parcelado: false,
      regularidade: "Único",
      categoria_id: "automatica",
      subcategoria_id: "automatica",
      ...defaultValues,
    },
  });

  const isParcelado = form.watch("parcelado");

  useEffect(() => {
    if (!isParcelado) {
      form.setValue("parcelas", undefined);
      form.setValue("regularidade", "Único");
    }
  }, [isParcelado, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <AlignLeft className="h-4 w-4" />
                Descrição
              </FormLabel>
              <FormControl>
                <Input placeholder="Digite uma descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <ListFilter className="h-4 w-4" />
                  Operação
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Receita">Receita</SelectItem>
                    <SelectItem value="Despesa">Despesa</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Valor
                </FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0,00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Status
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pago">Pago</SelectItem>
                    <SelectItem value="Programado">Programado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Data
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ResponsibleField form={form} />
        </div>

        <InstallmentFields form={form} />

        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </Form>
  );
};