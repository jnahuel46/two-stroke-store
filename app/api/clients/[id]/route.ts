import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const clientId = parseInt(id, 10);
    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
      include: {
        repairs: true,
      },
    });

    if (client) {
      return NextResponse.json(client);
    } else {
      return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    return NextResponse.json({ error: 'Error al obtener cliente' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}