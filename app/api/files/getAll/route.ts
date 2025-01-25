import { NextResponse } from "next/server"; 
import type { NextRequest } from "next/server";


import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { filesTable } from '@/database/schema';
import { desc, like } from 'drizzle-orm'; 

const db = drizzle(process.env.DATABASE_URL!);

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageSize = 50;
    const page = parseInt(searchParams.get('page') || "1");
    const search = searchParams.get('search') || "";

    const files = await db.select()
        .from(filesTable)
        .orderBy(desc(filesTable.id))
        .limit(pageSize) // the number of rows to return
        .offset((page - 1) * pageSize)
        .where(like(filesTable.filename, "%"+search+"%"));
        
    return NextResponse.json({ files });
  } catch (err) {
    return err;
  } finally { 
  }
}