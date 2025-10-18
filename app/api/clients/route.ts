import { prisma } from "@/lib/prismaConfig";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const clients = await prisma.client.findMany({
      where: {
        userId: parseInt(session.user.id),
      },
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
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Validación básica de datos
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: "Nombre y teléfono son requeridos" },
        { status: 400 }
      );
    }

    // Verificar si el cliente ya existe (por email o teléfono) para este usuario
    const whereConditions: Array<{ phone?: string; email?: string }> = [{ phone: body.phone }];
    if (body.email) {
      whereConditions.push({ email: body.email });
    }

    const existingClient = await prisma.client.findFirst({
      where: {
        userId: parseInt(session.user.id),
        OR: whereConditions,
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
        email: body.email || null,
        phone: body.phone,
        userId: parseInt(session.user.id),
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
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Validación básica de datos
    if (!body.id || !body.name || !body.phone) {
      return NextResponse.json(
        { error: "ID, nombre y teléfono son requeridos" },
        { status: 400 }
      );
    }

    // Verificar si el cliente existe y pertenece al usuario
    const existingClient = await prisma.client.findFirst({
      where: {
        id: body.id,
        userId: parseInt(session.user.id),
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
        email: body.email || null,
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
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Validación básica de datos
    if (!body.id) {
      return NextResponse.json(
        { error: "ID del cliente es requerido" },
        { status: 400 }
      );
    }

    // Verificar si el cliente existe y pertenece al usuario
    const existingClient = await prisma.client.findFirst({
      where: {
        id: body.id,
        userId: parseInt(session.user.id),
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