import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        _count: {
          select: {
            repairs: true,
          },
        },
      },
    });

    // Formatear la respuesta para incluir el número de arreglos en el nivel superior
    const formattedClients = clients.map((client) => ({
      id: client.id,
      name: client.name,
      phone: client.phone,
      email: client.email,
      repairs: client._count.repairs, // Agrega el número de arreglos
    }));

    return NextResponse.json(formattedClients);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return NextResponse.json(
      { error: "Error al obtener clientes" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
