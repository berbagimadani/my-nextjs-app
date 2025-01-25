"use server";

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { filesTable } from '@/database/schema';
import { desc, like } from 'drizzle-orm'; 

const db = drizzle(process.env.DATABASE_URL!);


class FileRepository {
  async getAllFiles(page: number, search: string | number) {
    const pageSize = 12
     const data = await db.select()
         .from(filesTable)
         .orderBy(desc(filesTable.id))
         .limit(pageSize) // the number of rows to return
         .offset((page - 1) * pageSize)
         .where(like(filesTable.filename, "%"+search+"%"));
    return data;
  }
}

export const fileRepository = new FileRepository();
