import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const repairs = await prisma.repair.findMany({
      include: {
        client: true, // Incluye la información del cliente relacionado
      },
    });

    return NextResponse.json(repairs);
  } catch (error) {
    console.error('Error al obtener arreglos:', error);
    return NextResponse.json({ error: 'Error al obtener arreglos' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}