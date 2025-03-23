import { Client } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addRepair } from "@/app/services/repairs";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AddRepairModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
}

export function AddRepairModal({
  isOpen,
  onClose,
  client,
}: AddRepairModalProps) {
  const queryClient = useQueryClient();
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [threshold_date, setThreshold] = useState("");

  const createMutation = useMutation({
    mutationFn: addRepair,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success(`Reparación creada con éxito en ${client?.name}`);
      onClose();
    },
    onError: (error) => {
      toast.error("Error al crear reparación", {
        description: `Error: ${error}`,
      });
    },
  });

  const handleCreate = () => {
    if (!client) return;
    createMutation.mutate({
      type,
      status: "Pendiente",
      budget: budget,
      description,
      clientId: client.id,
      threshold_date: threshold_date
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Reparación para {client?.name}</DialogTitle>
          <DialogDescription>
            Complete los campos para agregar una reparación.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Tipo de reparación"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <Input
          placeholder="Presupuesto"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <Textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Fecha de Entrega"
          value={threshold_date}
          onChange={(e) => setThreshold(e.target.value)}
        />
        <Button onClick={handleCreate}>Crear</Button>
      </DialogContent>
    </Dialog>
  );
}
