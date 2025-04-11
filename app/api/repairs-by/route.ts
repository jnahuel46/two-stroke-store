import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    // Si no hay parámetros de fecha, usar el mes actual
    const startDate = from ? new Date(from) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endDate = to ? new Date(to) : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    // Formatear fechas para la consulta
    const formattedStartDate = startDate.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).replace(/\//g, "/");

    const formattedEndDate = endDate.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).replace(/\//g, "/");

    const repairs = await prisma.repair.findMany({
      where: {
        userId: parseInt(session.user.id),
        threshold_date: {
          gte: formattedStartDate,
          lte: formattedEndDate,
        },
      },
      include: {
        client: true,
      },
      orderBy: {
        threshold_date: 'asc',
      },
    });

    return NextResponse.json(repairs);
  } catch (error) {
    console.error("Error al obtener arreglos por rango de fechas:", error);
    return NextResponse.json(
      { error: "Error al obtener arreglos" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
