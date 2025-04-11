import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const repairs = await prisma.repair.findMany({
      where: {
        userId: parseInt(session.user.id),
      },
      include: {
        client: true, // Incluye la información del cliente relacionado
      },
    });

    return NextResponse.json(repairs);
  } catch (error) {
    console.error("Error al obtener arreglos:", error);
    return NextResponse.json(
      { error: "Error al obtener arreglos" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    // Validación básica de datos
    if (!body.id) {
      return NextResponse.json({ error: "ID es requerido" }, { status: 400 });
    }

    // Verificar si el cliente existe
    const existingRepair = await prisma.repair.findFirst({
      where: {
        id: body.id,
      },
    });

    if (!existingRepair) {
      return NextResponse.json(
        { error: "El arreglo no existe" },
        { status: 404 }
      );
    }

    // Actualización del cliente
    const repair = await prisma.repair.update({
      where: {
        id: body.id,
      },
      data: {
        type: body.type,
        status: body.status,
        budget: body.budget,
        description: body.description,
        threshold_date: body.threshold_date,
      },
      include: {
        client: true, // Incluye la información del cliente relacionado
      },
    });

    return NextResponse.json(repair);
  } catch (error) {
    console.error("Error al editar el arreglo:", error);
    return NextResponse.json(
      { error: "Error al editar el arreglo" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();

    // Validación básica de datos
    if (!body.clientId) {
      return NextResponse.json(
        { error: "ID de cliente es requerido" },
        { status: 400 }
      );
    }

    // Verificar si el cliente existe y pertenece al usuario
    const existingClient = await prisma.client.findFirst({
      where: {
        id: body.clientId,
        userId: parseInt(session.user.id),
      },
    });

    if (!existingClient) {
      return NextResponse.json(
        { error: "El cliente no existe" },
        { status: 404 }
      );
    }

    // Creación del arreglo
    const repair = await prisma.repair.create({
      data: {
        type: body.type,
        status: body.status,
        budget: body.budget,
        description: body.description,
        clientId: body.clientId,
        threshold_date: body.threshold_date,
        userId: parseInt(session.user.id),
      },
      include: {
        client: true, // Incluye la información del cliente relacionado
      },
    });

    return NextResponse.json(repair, { status: 201 });
  } catch (error) {
    console.error("Error al crear el arreglo:", error);
    return NextResponse.json(
      { error: "Error al crear el arreglo" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await req.json();

    await prisma.repair.delete({
      where: {
        id: id,
        userId: parseInt(session.user.id),
      },
    });

    return NextResponse.json(
      { message: "Arreglo eliminado con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar el arreglo:", error);
    return NextResponse.json(
      { error: "Error al eliminar el arreglo" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
