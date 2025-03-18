import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Client, RepairDetail } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editRepair } from "@/app/services/repairs";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Description } from "@radix-ui/react-dialog";

interface RepairDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
}

export function RepairDetailsModal({
  isOpen,
  onClose,
  client,
}: RepairDetailsModalProps) {
  const repairDetails: RepairDetail[] = client?.repairs || [];

  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<{ repairs: RepairDetail[] }>({
    defaultValues: {
      repairs: repairDetails,
    },
  });

  const editRepairMutation = useMutation({
    mutationFn: editRepair,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Arreglos actualizados con éxito");
      onClose();
    },
    onError: (error) => {
      toast.error("Error al actualizar arreglos", {
        description: `Error: ${error}`,
      });
    },
  });

  const onSubmit = async (data: { repairs: RepairDetail[] }) => {
    try {
      for (const repair of data.repairs) {
        // Aseguramos que el id esté presente en el objeto
        const repairWithId = { ...repair, id: repair.id };
        await editRepairMutation.mutate(repairWithId);
      }
    } catch (error) {
      console.error(`Error al actualizar arreglos: ${error}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalles de Arreglos - {client?.name}</DialogTitle>
          <Description>Modifica el estado de los arreglos</Description>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tipo de Arreglo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Presupuesto</TableHead>
                <TableHead>Descripción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repairDetails.map((repair, index) => (
                <TableRow key={repair.id}>
                  {/* Columna ID */}
                  <TableCell>
                    <Controller
                      name={`repairs.${index}.id`}
                      control={control}
                      defaultValue={repair.id}
                      render={() => <p className="w-[40px] p-0">{repair.id}</p>}
                    />
                  </TableCell>

                  {/* Columna Tipo de Arreglo */}
                  <TableCell>
                    <Controller
                      name={`repairs.${index}.type`}
                      control={control}
                      defaultValue={repair.type}
                      render={({ field }) => (
                        <Textarea {...field} className="w-36" readOnly />
                      )}
                    />
                  </TableCell>

                  {/* Columna Estado */}
                  <TableCell>
                    <Controller
                      name={`repairs.${index}.status`}
                      control={control}
                      defaultValue={repair.status}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Seleccionar estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pendiente">Pendiente</SelectItem>
                            <SelectItem value="En Progreso">
                              En Progreso
                            </SelectItem>
                            <SelectItem value="Completado">
                              Completado
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </TableCell>

                  {/* Columna Presupuesto */}
                  <TableCell>
                    <Controller
                      name={`repairs.${index}.budget`}
                      control={control}
                      defaultValue={repair.budget}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="w-[50px] p-0 border-none"
                        />
                      )}
                    />
                  </TableCell>

                  {/* Columna Descripción */}
                  <TableCell>
                    <Controller
                      name={`repairs.${index}.description`}
                      control={control}
                      defaultValue={repair.description}
                      render={({ field }) => (
                        <Textarea {...field} className="w-42" />
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end mt-4">
            <Button type="submit">Guardar Cambios</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
