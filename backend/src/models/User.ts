import pool from '../config/database';
import bcrypt from 'bcryptjs';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  name: string;
  created_at?: Date;
}

export class User {
  static async create(user: IUser): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
      [user.email, hashedPassword, user.name]
    );
    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  static async findById(id: number): Promise<IUser | null> {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
} 