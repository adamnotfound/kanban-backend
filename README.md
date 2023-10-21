**To run locally here's what you need to do:**

**Dependencies;**

 - Node >= 18
 - Nodemon.
 - MySQL database.
 
 **Steps;**
 
 1. Replace .env DATABASE_URL with your database url.
 2. Install packages using ```npm install```
 3. Run the following to generate the prisma client ```prisma generate```
 4. Run the following to migrate database ```prisma migrate dev```
 5. Run the following to seed the database with initial data ```prisma db seed```
  
 - Now check your database to confirm the schema generation and tables and data seeding.
 
 6. Run the server ```npm run dev```

// To-dos

1. Adding test cases.