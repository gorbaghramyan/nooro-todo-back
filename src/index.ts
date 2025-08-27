import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Prisma } from '@prisma/client';
import { prisma } from './lib/prisma.js';
import { validateTask, validateTaskUpdate } from './validation.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/tasks', async (_req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/tasks', validateTask, async (req, res) => {
  const { title, color } = req.body;
  try {
    const task = await prisma.task.create({
      data: { title, color },
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.put('/tasks/:id', validateTaskUpdate, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const task = await prisma.task.update({
      where: { id },
      data: req.body,
    });
    res.json(task);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.task.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
