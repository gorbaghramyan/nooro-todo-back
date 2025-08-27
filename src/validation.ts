import { Request, Response, NextFunction } from 'express';

export const allowedColors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'brown', 'teal'] as const;

export function validateTask(req: Request, res: Response, next: NextFunction) {
  const { title, color } = req.body;

  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (color && !allowedColors.includes(color)) {
    return res
      .status(400)
      .json({ error: `Invalid color. Allowed colors: ${allowedColors.join(', ')}` });
  }

  next();
}

export function validateTaskUpdate(req: Request, res: Response, next: NextFunction) {
  const { title, color, completed } = req.body;

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ error: 'Title must be a non-empty string' });
  }

  if (color !== undefined && !allowedColors.includes(color)) {
    return res
      .status(400)
      .json({ error: `Invalid color. Allowed colors: ${allowedColors.join(', ')}` });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be a boolean' });
  }

  next();
}
