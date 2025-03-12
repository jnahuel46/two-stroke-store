import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

  try {
    const repairId = parseInt(id, 10); // Parse the ID as an integer
    const repair = await prisma.repair.findUnique({
      where: {
        id: repairId,
      },
      include: {
        client: true,
      },
    });

    if (repair) {
      return NextResponse.json(repair);
    } else {
      return NextResponse.json({ error: 'Arreglo no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error al obtener arreglo:', error);
    return NextResponse.json({ error: 'Error al obtener arreglo' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}