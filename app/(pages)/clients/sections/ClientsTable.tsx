"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { Client } from "@/types/types";
import { RepairDetailsModal } from "./RepairDetailModal";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/app/services/clients";
import { Skeleton } from "@/components/ui/skeleton";
import { EditClientModal } from "./EditClientModal";

export function ClientTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const clients: Client[] = data || [];

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isRepairModalOpen, setIsRepairModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenRepairModal = (client: Client) => {
    setSelectedClient(client);
    setIsRepairModalOpen(true);
  };

  const handleOpenEditModal = (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleEditModal = (client: Client) => {
    console.log("Editando cliente", client);
  };

  if (isLoading) return <Skeleton className="w-full h-[200px]" />;
  if (error) return <p>Error</p>;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Arreglos</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>
                <Button variant="link" onClick={() => handleOpenRepairModal(client)}>
                  {client?.repairs?.length || 0}
                </Button>
              </TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleOpenEditModal(client)}>
                  <Edit className="w-5 h-5 text-blue-500" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de detalles de reparación */}
      <RepairDetailsModal
        isOpen={isRepairModalOpen}
        onClose={() => setIsRepairModalOpen(false)}
        client={selectedClient}
      />

      {/* Modal de edición de cliente */}
      <EditClientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        client={selectedClient}
        onEdit={handleEditModal}
      />
    </>
  );
}
