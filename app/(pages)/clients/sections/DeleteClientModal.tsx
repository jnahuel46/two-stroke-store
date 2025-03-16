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
import { deleteClient } from "@/app/services/clients";
import { toast } from "sonner";

interface DeleteClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
}

export function DeleteClientModal({
  isOpen,
  onClose,
  client,
}: DeleteClientModalProps) {

  const queryClient = useQueryClient(); // Usa useQueryClient en lugar de crear un nuevo QueryClient

  const handleDelete = () => {
    if (!client) return;
    deleteMutation.mutate(client.id);
  };
  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Cliente eliminado con éxito");
      onClose();
    },
    onError: (error) => {
      toast.error("Error al eliminar cliente", {
        description: `Error al eliminar cliente: ${error}`,
      });
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrar Cliente {client?.name}</DialogTitle>
          <DialogDescription>
            Click en Eliminar para borrar el cliente.
          </DialogDescription>
        </DialogHeader>
        <Button variant="destructive" onClick={handleDelete}>
          Eliminar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
