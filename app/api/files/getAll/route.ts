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
    const pageSize = 12;
    const page = parseInt(searchParams.get('page') || "1");
    const search = searchParams.get('search') || "";
    const cache = searchParams.get("cache") || "";

    const files = await db.select()
        .from(filesTable)
        .orderBy(desc(filesTable.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize)
        .where(like(filesTable.filename, "%"+search+"%"));
        
        console.log(cache, "Fetching files from DB:", { page, search });

        return NextResponse.json(files, {
          headers: cache
            ? { "Cache-Control": "no-store" } // Tidak menggunakan cache
            : { "Cache-Control": "s-maxage=90, stale-while-revalidate=90" }, // ISR
        });

    } catch (err) {
      console.error("Error fetching files:", err);
      return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
    }
}

// import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { filesTable } from '@/database/schema';
// import { desc, like } from 'drizzle-orm';
// import { NextRequest, NextResponse } from 'next/server';

// const db = drizzle(process.env.DATABASE_URL!);

// export const dynamic = "force-dynamic";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get("page") || "1", 10);
//     const search = searchParams.get("search") || "";
//     const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);

//     // Validasi parameter
//     if (isNaN(page) || page < 1) {
//       return NextResponse.json({ error: "Invalid page parameter" }, { status: 400 });
//     }
//     if (isNaN(pageSize) || pageSize < 1 || pageSize > 100) {
//       return NextResponse.json({ error: "Invalid pageSize parameter" }, { status: 400 });
//     }

//     const files = await db
//       .select()
//       .from(filesTable)
//       .orderBy(desc(filesTable.id))
//       .limit(pageSize)
//       .offset((page - 1) * pageSize)
//       .where(search ? like(filesTable.filename, `%${search}%`) : undefined);

//     return NextResponse.json(files, {
//       headers: {
//         "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
//       },
//     });
//   } catch (err) {
//     console.error("Error fetching files:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch files" },
//       { status: 500 }
//     );
//   }
// }
