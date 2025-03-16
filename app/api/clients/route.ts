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

export async function PATCH(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();

    // Validación básica de datos
    if (!body.id || !body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Verificar si el cliente existe
    const existingClient = await prisma.client.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!existingClient) {
      return NextResponse.json(
        { error: "El cliente no existe" },
        { status: 404 }
      );
    }

    // Actualización del cliente
    const client = await prisma.client.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error al editar cliente:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();

    // Validación básica de datos
    if (!body.id) {
      return NextResponse.json(
        { error: "ID del cliente es requerido" },
        { status: 400 }
      );
    }

    // Verificar si el cliente existe
    const existingClient = await prisma.client.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!existingClient) {
      return NextResponse.json(
        { error: "El cliente no existe" },
        { status: 404 }
      );
    }

    // Eliminación del cliente
    await prisma.client.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json({ message: "Cliente eliminado" });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}