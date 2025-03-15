"use client";

import { Button } from "@/components/ui/button";
import { ClientTable } from "./sections/ClientsTable";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/app/services/clients";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientManagement() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });
  if (isLoading) return <Skeleton  className="w-full h-[200px]"/>;
  if (error) return <p>Error</p>;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>
      <div className="mb-4 space-x-2">
        <Button>Añadir Cliente</Button>
        <Button disabled>Editar Cliente</Button>
        <Button disabled variant="destructive">
          Eliminar Cliente
        </Button>
      </div>
      <ClientTable clients={data} />
    </div>
  );
}
