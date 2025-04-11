import { RepairDetail } from "@/types/types";

export const getRepairs = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/repairs`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const editRepair = async (repair: RepairDetail) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/repairs`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(repair),
    }
  );

  if (!response.ok) {
    const errorData = await response.json(); // Captura el mensaje del backend
    throw new Error(errorData.error || "Error al editar el arreglo");
  }
  return response.json();
};

export const addRepair = async (repair: RepairDetail) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/repairs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(repair),
    }
  );

  if (!response.ok) {
    const errorData = await response.json(); // Captura el mensaje del backend
    throw new Error(errorData.error || "Error al agregar el arreglo");
  }
  return response.json();
}

export const getRepairsbyDate = async (from?: Date, to?: Date) => {
  // Si no se proporcionan fechas, usar el mes actual
  const startDate = from || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const endDate = to || new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/repairs-by?from=${startDate.toISOString()}&to=${endDate.toISOString()}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const deleteRepair = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/repairs`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};