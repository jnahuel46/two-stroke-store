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
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Client } from "@/types/types";
import { RepairDetailsModal } from "./RepairDetailModal";

interface ClientTableProps {
  clients: Client[];
}

export function ClientTable({ clients }: ClientTableProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Arreglos</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-[50px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>
                <Button variant="link" onClick={() => handleOpenModal(client)}>
                  {client?.repairs?.length || 0}
                </Button>
              </TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        client={selectedClient}
      />
    </>
  );
}
