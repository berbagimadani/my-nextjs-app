import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './db/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    const user: typeof usersTable.$inferInsert = {
      filename: 'John',  
    };
    await db.insert(usersTable).values(user);
    console.log('New user created!')
    const users = await db.select().from(usersTable);
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
      .update(usersTable)
      .set({
        filename: "aaaaaaaaaaaupdate",
      })
      .where(eq(usersTable.filename, user.filename));
    console.log('User info updated!')
    await db.delete(usersTable).where(eq(usersTable.filename, user.filename));
    console.log('User deleted!')
  }
  main();