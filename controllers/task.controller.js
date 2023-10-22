const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createItem(req, res) {
  try {
    let { title, description, createdBy, assignedTo } = req.body;
    // Assign the task to the reporter by default if no assignee is provided
    if (!assignedTo) assignedTo = createdBy;
    // Using transaction to create the task

    console.log(assignedTo);
    const task = await prisma.$transaction(async (prisma) => {
      const createdTask = await prisma.task.create({
        data: { title, description, status: "ToDo", createdBy, assignedTo },
      });
      return createdTask;
    });
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Task creation failed" });
  }
}

async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updateData = {}; // Create an empty object for updates
    const fieldsToUpdate = ["title", "description", "assignedTo", "status"];

    // Loop through the fields and add any provided to updateData
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    //Validating the transitions based on the table provided
    if (status) {
      //Allowed transitions hashmap
      const validTransitions = {
        ToDo: ["InProgress"],
        InProgress: ["Blocked", "In QA"],
        Blocked: ["ToDo"],
        InQA: ["Done", "ToDo"],
        Done: ["Deployed"],
      };
      //Getting current task to check for current status
      const currentTask = await prisma.task.findUnique({
        where: { id: parseInt(id) },
      });
      //Making sure that provided status is different than the current before validating
      if (
        currentTask.status !== status &&
        !validTransitions[currentTask.status].includes(status)
      ) {
        return res.status(400).json({ message: "Invalid status transition" });
      }
    }
    // Using transaction to update the item
    const task = await prisma.$transaction(async (prisma) => {
      const updatedTask = await prisma.task.update({
        where: { id: parseInt(id) },
        data: updateData,
      });
      return updatedTask;
    });
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Task update failed" });
  }
}

async function deleteItem(req, res) {}

async function getItems(req, res) {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { createItem, updateItem, deleteItem, getItems };
