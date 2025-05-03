import { readFileSync } from 'fs';
import { join } from 'path';
import pool from '../config/database';

const initDatabase = async () => {
  try {
    // Read the SQL file
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');

    // Execute the SQL commands
    await pool.query(schema);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Run the initialization
initDatabase(); 