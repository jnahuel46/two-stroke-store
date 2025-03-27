"use client";

import { Button } from "@/components/ui/button";
import { ClientTable } from "./sections/ClientsTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addClient } from "@/app/services/clients";
import { AddClientModal } from "./sections/AddClientModal";
import { Client } from "@/types/types";
import { useState } from "react";
import { toast } from "sonner";

export default function ClientManagement() {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addClient,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setIsModalAddOpen(false);

      toast.success("Cliente agregado con éxito", {
        description: `Nombre: ${data.name}, Email: ${data.email}`,
      });
    },
    onError: (error) => {
      console.log("Error al agregar cliente:", error);
      toast.error("Error al agregar cliente", {
        description: `Error al agregar cliente: ${error}`,
      });
    },
  });

  const handleAddClient = (client: Omit<Client, "id" | "repairs" | "userId">) => {
    mutation.mutate(client);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>
      <div className="mb-4 space-x-2">
        <Button onClick={() => setIsModalAddOpen(true)}>Añadir Cliente</Button>
      </div>
      <ClientTable />
      <AddClientModal
        isOpen={isModalAddOpen}
        onClose={() => setIsModalAddOpen(false)}
        onAdd={handleAddClient}
      />
    </div>
  );
}
