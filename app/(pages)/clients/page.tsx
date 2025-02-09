"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Client } from "@/types/types";
import { ClientTable } from "./sections/ClientsTable";
import { AddClientModal } from "./sections/AddClientModal";
import { EditClientModal } from "./sections/EditClientModal";
import { RepairDetailsModal } from "./sections/RepairDetailModal";

export default function ClientManagement() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      repairs: 2,
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "098-765-4321",
      repairs: 1,
      email: "jane@example.com",
    },
  ]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRepairModalOpen, setIsRepairModalOpen] = useState(false);

  const addClient = (client: Omit<Client, "id" | "repairs">) => {
    setClients([...clients, { ...client, id: clients.length + 1, repairs: 0 }]);
  };

  const editClient = (updatedClient: Client) => {
    setClients(
      clients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };

  const deleteClient = () => {
    if (selectedClient) {
      setClients(clients.filter((client) => client.id !== selectedClient.id));
      setSelectedClient(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>
      <div className="mb-4 space-x-2">
        <Button onClick={() => setIsAddModalOpen(true)}>Añadir Cliente</Button>
        <Button
          onClick={() => setIsEditModalOpen(true)}
          disabled={!selectedClient}
        >
          Editar Cliente
        </Button>
        <Button
          onClick={deleteClient}
          disabled={!selectedClient}
          variant="destructive"
        >
          Eliminar Cliente
        </Button>
      </div>
      <ClientTable
        clients={clients}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        onRepairClick={(client: Client) => {
          setSelectedClient(client);
          setIsRepairModalOpen(true);
        }}
      />
      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addClient}
      />
      <EditClientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={editClient}
        client={selectedClient}
      />
      <RepairDetailsModal
        isOpen={isRepairModalOpen}
        onClose={() => setIsRepairModalOpen(false)}
        client={selectedClient}
      />
    </div>
  );
}
