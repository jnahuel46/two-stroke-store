import { Client } from "@/types/types";

export const getClients = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/clients`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const addClient = async (client: Omit<Client, "id" | "repairs" | "userId">) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/clients`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    }
  );

  if (!response.ok) {
    const errorData = await response.json(); // Captura el mensaje del backend
    throw new Error(errorData.error || "Error al crear el cliente");
  }
  return response.json();
};

export const editClient = async (client: Client) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/clients`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    }
  );

  if (!response.ok) {
    const errorData = await response.json(); // Captura el mensaje del backend
    throw new Error(errorData.error || "Error al editar el cliente");
  }
  return response.json();
};

export const deleteClient = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/clients`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json(); // Captura el mensaje del backend
    throw new Error(errorData.error || "Error al eliminar el cliente");
  }
  return response.json();
}

export const getRepairStats = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/repairs/stats`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};