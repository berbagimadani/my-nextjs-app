import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { filesTable } from './schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    const file: typeof filesTable.$inferInsert = {
      filename: 'John',
      url: '',
      fileid: ''
    };
    await db.insert(filesTable).values(file);
    console.log('New user created!')
    const users = await db.select().from(filesTable);
    console.log('Getting all users from the database: ', users)
    /*
    const users: {
      id: number;
      name: string;
      age: number;
      email: string;
    }[]
    */
    await db
      .update(filesTable)
      .set({
        filename: "aaaaaaaaaaaupdate",
      })
      .where(eq(filesTable.filename, file.filename));
    console.log('User info updated!')
    await db.delete(filesTable).where(eq(filesTable.filename, file.filename));
    console.log('User deleted!')
  }
  main();