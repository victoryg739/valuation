import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const industry = searchParams.get('industry') || ''; // Ensure industry is a string

    if (!industry) {
        return NextResponse.json({ error: 'Industry parameter is required' }, { status: 400 });
    }

    try {
        const inputStats = await prisma.input_stats.findUnique({
            where: { industry: industry },
        });

        if (!inputStats) {
            return NextResponse.json({ error: 'No data found for the provided industry' }, { status: 404 });
        }
        return NextResponse.json(inputStats);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}