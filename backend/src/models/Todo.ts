import pool from '../config/database';

export interface ITodo {
  id?: number;
  user_id: number;
  text: string;
  completed: boolean;
  created_at?: Date;
}

export class Todo {
  static async create(todo: ITodo): Promise<ITodo> {
    const result = await pool.query(
      'INSERT INTO todos (user_id, text, completed) VALUES ($1, $2, $3) RETURNING *',
      [todo.user_id, todo.text, todo.completed]
    );
    return result.rows[0];
  }

  static async findByUserId(userId: number): Promise<ITodo[]> {
    const result = await pool.query(
      'SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async findById(id: number, userId: number): Promise<ITodo | null> {
    const result = await pool.query(
      'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0] || null;
  }

  static async update(id: number, userId: number, todo: Partial<ITodo>): Promise<ITodo | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (todo.text) {
      updates.push(`text = $${paramCount}`);
      values.push(todo.text);
      paramCount++;
    }
    if (typeof todo.completed === 'boolean') {
      updates.push(`completed = $${paramCount}`);
      values.push(todo.completed);
      paramCount++;
    }

    values.push(id, userId);
    const result = await pool.query(
      `UPDATE todos SET ${updates.join(', ')} WHERE id = $${paramCount} AND user_id = $${paramCount + 1} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  static async delete(id: number, userId: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rowCount ? result.rowCount > 0 : false;
  }
} 