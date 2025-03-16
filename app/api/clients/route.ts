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

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();

    // Validación básica de datos
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Verificar si el cliente ya existe (por email o teléfono)
    const existingClient = await prisma.client.findFirst({
      where: {
        OR: [{ email: body.email }, { phone: body.phone }],
      },
    });

    if (existingClient) {
      return NextResponse.json(
        { error: "El cliente ya existe" },
        { status: 409 }
      );
    }

    // Creación del cliente
    const client = await prisma.client.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
