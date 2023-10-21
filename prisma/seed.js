const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Create users
    const user1 = await prisma.user.create({
      data: {
        name: 'User 1',
        email: 'user1@example.com',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: 'User 2',
        email: 'user2@example.com',
      },
    });

    // Create tasks
    const task1 = await prisma.task.create({
      data: {
        title: 'Task 1',
        description: 'Description for Task 1',
        status: 'ToDo',
        createdBy: user1.id,
        assignedTo: user1.id
      },
    });

    const task2 = await prisma.task.create({
      data: {
        title: 'Task 2',
        description: 'Description for Task 2',
        status: 'InProgress',
        createdBy: user2.id,
        assignedTo: user2.id
      },
    });

    const task3 = await prisma.task.create({
      data: {
        title: 'Task 3',
        description: 'Description for Task 3',
        status: 'Done',
        createdBy: user1.id,
        assignedTo: user1.id
      },
    });

    console.log('Seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call the seeder function
seedDatabase();
