import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // Obtener estadísticas agrupadas por estado
    const stats = await prisma.repair.groupBy({
      by: ['status'],
      where: {
        userId: userId,
      },
      _count: {
        status: true,
      },
    });

    // Formatear las estadísticas para el frontend
    const formattedStats = {
      pendiente: 0,
      completado: 0,
      "en progreso": 0,
    };

    stats.forEach((stat) => {
      const status = stat.status.toLowerCase() as keyof typeof formattedStats;
      if (formattedStats.hasOwnProperty(status)) {
        formattedStats[status] = stat._count.status;
      }
    });

    return NextResponse.json(formattedStats);
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}