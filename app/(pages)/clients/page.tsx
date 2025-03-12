import { Button } from "@/components/ui/button";
import { ClientTable } from "./sections/ClientsTable";

async function getClients() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clients`, {
    cache: "no-cache", // Evita servir datos en caché
  });

  if (!res.ok) {
    throw new Error("Failed to fetch clients");
  }

  return res.json();
}

export default async function ClientManagement() {
  const clients = await getClients();

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
      <ClientTable clients={clients} />
    </div>
  );
}
