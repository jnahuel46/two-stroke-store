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

export const getRepairsbyDate = async () => {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/repairs-by`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};