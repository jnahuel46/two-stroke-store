import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Obtener la fecha actual y formatearla a DD/MM/YYYY con ceros a la izquierda
    const today = new Date();
    const formattedDate = today
      .toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/"); // Asegurar formato correcto

    console.log(formattedDate); // Verificar en consola

    const repairs = await prisma.repair.findMany({
      where: {
        threshold_date: formattedDate,
      },
      include: {
        client: true,
      },
    });

    return NextResponse.json(repairs);
  } catch (error) {
    console.error("Error al obtener arreglos por threshold_date:", error);
    return NextResponse.json(
      { error: "Error al obtener arreglos" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
