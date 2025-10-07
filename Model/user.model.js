import { uuid, pgTable, varchar , timestamp , text} from "drizzle-orm/pg-core";



export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  firstname: varchar("first_name").notNull(),
  lastname: varchar("last_name").notNull(),

  email: varchar("email").notNull(),
  password: text("password").notNull(),
  salt: text("salt").notNull(),

  createdat: timestamp("createdat").notNull().defaultNow(),
  updatedat: timestamp("updatedat").$onUpdate(()=>  new Date()),
});