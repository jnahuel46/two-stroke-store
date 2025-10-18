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
import { Input } from "@/components/ui/input";
import { Trash2, Edit, Plus, Search, ArrowUpDown } from "lucide-react";
import { useState, useMemo } from "react";
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

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isRepairModalOpen, setIsRepairModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddRepairModalOpen, setIsAddRepairModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredClients = useMemo(() => {
    const clients: Client[] = data || [];
    let filtered = clients;

    if (searchTerm) {
      filtered = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by name
    return filtered.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }, [data, searchTerm, sortOrder]);

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
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="h-auto p-0 font-medium"
              >
                Nombre
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Arreglos</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.map((client) => (
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
              <TableCell>{client.email || "N/A"}</TableCell>
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
