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
  const repairDetails: RepairDetail[] = [
    {
      type: "Pantalla",
      status: "Completado",
      budget: "$100",
      description: "Reemplazo de pantalla",
    },
    {
      type: "Batería",
      status: "En progreso",
      budget: "$50",
      description: "Cambio de batería",
    },
    {
      type: "Software",
      status: "Pendiente",
      budget: "$30",
      description: "Actualización de sistema",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalles de Arreglos - {client?.name}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo de Arreglo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Presupuesto</TableHead>
              <TableHead>Descripción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {repairDetails.map((repair, index) => (
              <TableRow key={index}>
                <TableCell>{repair.type}</TableCell>
                <TableCell>{repair.status}</TableCell>
                <TableCell>{repair.budget}</TableCell>
                <TableCell>{repair.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
