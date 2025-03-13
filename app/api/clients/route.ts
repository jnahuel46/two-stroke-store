import { prisma } from "@/lib/prismaConfig";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        repairs: true,
      },
    });

    return NextResponse.json(clients);
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
