import pool from '../config/database';

export interface IJournalEntry {
  id?: number;
  user_id: number;
  mood: string;
  text: string;
  created_at?: Date;
}

export class JournalEntry {
  static async create(entry: IJournalEntry): Promise<IJournalEntry> {
    const result = await pool.query(
      'INSERT INTO journal_entries (user_id, mood, text) VALUES ($1, $2, $3) RETURNING *',
      [entry.user_id, entry.mood, entry.text]
    );
    return result.rows[0];
  }

  static async findByUserId(userId: number): Promise<IJournalEntry[]> {
    const result = await pool.query(
      'SELECT * FROM journal_entries WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async findById(id: number, userId: number): Promise<IJournalEntry | null> {
    const result = await pool.query(
      'SELECT * FROM journal_entries WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0] || null;
  }

  static async update(id: number, userId: number, entry: Partial<IJournalEntry>): Promise<IJournalEntry | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (entry.mood) {
      updates.push(`mood = $${paramCount}`);
      values.push(entry.mood);
      paramCount++;
    }
    if (entry.text) {
      updates.push(`text = $${paramCount}`);
      values.push(entry.text);
      paramCount++;
    }

    values.push(id, userId);
    const result = await pool.query(
      `UPDATE journal_entries SET ${updates.join(', ')} WHERE id = $${paramCount} AND user_id = $${paramCount + 1} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  static async delete(id: number, userId: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM journal_entries WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rowCount ? result.rowCount > 0 : false;
  }
} 