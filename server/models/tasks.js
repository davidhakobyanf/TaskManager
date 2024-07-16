const { connectToDb, getDb } = require("../db.js");

let db;
connectToDb((error) => {
  if (!error) {
    db = getDb();
  }
});

module.exports = class Task {
  async createTask(req, res) {
    const { id, title, description, priority, progress } = req.body;
    const task = { id, title, description, priority, progress };
    try {
      await db.collection('Tasks').insertOne(task);
      res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating task' });
    }
  }

  async updateTask(req, res) {
    const { id, title, description, priority, progress } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID is required to update a task' });
    }

    try {
      const result = await db.collection('Tasks').updateOne(
        { id: id },
        { $set: { title, description, priority, progress } }
      );

      if (result.matchedCount === 0) {
        res.status(404).json({ message: 'Task not found' });
      } else {
        res.status(200).json({ message: 'Task updated successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating task' });
    }
  }

  async getAllTasks(req, res) {
        try {
            const tasks = await db.collection('Tasks').aggregate([
                {
                    $addFields: {
                        priorityValue: {
                            $switch: {
                                branches: [
                                    { case: { $eq: ["$priority", "High"] }, then: 1 },
                                    { case: { $eq: ["$priority", "Normal"] }, then: 2 },
                                    { case: { $eq: ["$priority", "Low"] }, then: 3 }
                                ],
                                default: 4
                            }
                        }
                    }
                },
                {
                    $sort: { priorityValue: 1 }
                },
                {
                    $project: {
                        priorityValue: 0
                    }
                }
            ]).toArray();

            res.status(200).json(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ error: 'Error fetching tasks' });
        }
    } 

    async deleteTask(req, res) {
        const { id } = req.body;
    
        if (!id) {
            return res.status(400).json({ message: 'ID is required to delete a task' });
        }
    
        try {
            const result = await db.collection('Tasks').deleteOne({ id: id });
    
            if (result.deletedCount === 0) {
                res.status(404).json({ message: 'Task not found' });
            } else {
                res.status(200).json({ message: 'Task deleted successfully' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error deleting task' });
        }
    }
    
}

