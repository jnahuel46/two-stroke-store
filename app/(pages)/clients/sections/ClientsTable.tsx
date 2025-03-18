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
import { Trash2, Edit, Plus } from "lucide-react";
import { useState } from "react";
import { Client } from "@/types/types";
import { RepairDetailsModal } from "./RepairDetailModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editClient, getClients } from "@/app/services/clients";
import { Skeleton } from "@/components/ui/skeleton";
import { EditClientModal } from "./EditClientModal";
import { DeleteClientModal } from "./DeleteClientModal";
import { toast } from "sonner";
import { AddRepairModal } from "./AddRepairModal";

export function ClientTable() {
  const queryClient = useQueryClient(); // Usa useQueryClient en lugar de crear un nuevo QueryClient

  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const clients: Client[] = data || [];

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isRepairModalOpen, setIsRepairModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddRepairModalOpen, setIsAddRepairModalOpen] = useState(false);

  const handleOpenRepairModal = (client: Client) => {
    setSelectedClient(client);
    setIsRepairModalOpen(true);
  };

  const handleOpenEditModal = (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteModalOpen(true);
  };

  const handleOpenAddRepairModal = (client: Client) => {
    setSelectedClient(client);
    setIsAddRepairModalOpen(true);
  };

  const editMutation = useMutation({
    mutationFn: editClient,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setIsEditModalOpen(false);
      toast.success("Cliente editar con éxito", {
        description: `Nombre: ${data.name}, Email: ${data.email}`,
      });
    },
    onError: (error) => {
      toast.error("Error al editar cliente", {
        description: `Error al editar cliente: ${error}`,
      });
    },
  });

  const handleEditClient = (client: Client) => {
    editMutation.mutate(client);
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
                <Button
                  variant="link"
                  onClick={() => handleOpenRepairModal(client)}
                >
                  {client?.repairs?.length || 0}
                </Button>
              </TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleOpenAddRepairModal(client)}
                >
                  <Plus className="w-5 h-5 text-green-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleOpenEditModal(client)}
                >
                  <Edit className="w-5 h-5 text-blue-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleOpenDeleteModal(client)}
                >
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
        onEdit={handleEditClient}
      />

      {/* Modal de eliminación de cliente */}
      <DeleteClientModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        client={selectedClient}
      />

      <AddRepairModal
        isOpen={isAddRepairModalOpen}
        onClose={() => setIsAddRepairModalOpen(false)}
        client={selectedClient}
      />
    </>
  );
}
