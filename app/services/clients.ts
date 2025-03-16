import { Client } from "@prisma/client";

export const getClients = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/clients`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const addClient = async (client: Omit<Client, "id" | "repairs">) => {
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