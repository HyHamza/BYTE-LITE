// Import dotenv and load environment variables from the .env file
require("dotenv").config();

const { Pool } = require("pg");

// Use the 'set' module to get the value of DATABASE_URL from your configurations
const s = require("../set");

// Retrieve the database URL from the s.DATABASE_URL variable
var dbUrl = s.DATABASE_URL ? s.DATABASE_URL : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9";
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Create a PostgreSQL connection pool
const pool = new Pool(proConfig);

// Function to create the "events" table if it doesn't exist
const createEventsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        Id serial PRIMARY KEY,
        jid text UNIQUE,
        welcome text DEFAULT 'non',
        goodbye text DEFAULT 'non',
        antipromote text DEFAULT 'non',
        antidemote text DEFAULT 'non'
      );
    `);
    console.log("The 'events' table was created successfully.");
  } catch (e) {
    console.error("Error creating the 'events' table:", e);
  }
};

// Call the function to create the "events" table
createEventsTable();

// Function to add or update a value for a specific row (column) in the "events" table
async function setValue(jid, row, value) {
  const client = await pool.connect();

  try {
    // Check if the jid exists in the table
    const result = await client.query('SELECT * FROM events WHERE jid = $1', [jid]);
    
    // Check the length of rows to determine if the jid exists
    const jidExists = result.rows.length > 0;

    if (jidExists) {
      // If the jid exists, update the value of the specified column (row)
      await client.query(`UPDATE events SET ${row} = $1 WHERE jid = $2`, [value, jid]);
      console.log(`Column ${row} updated to ${value} for jid ${jid}`);
    } else {
      // If the jid doesn't exist, insert a new row with the specified jid and value
      await client.query(`INSERT INTO events (jid, ${row}) VALUES ($1, $2)`, [jid, value]);
      console.log(`New jid ${jid} added with column ${row} set to ${value}`);
    }
  } catch (error) {
    console.error("Error updating events:", error);
  } finally {
    client.release();
  }
}

// Function to retrieve the value of a specific row (column) for a given jid from the "events" table
async function getEventsValue(jid, row) {
  const client = await pool.connect();
  try {
    const result = await client.query(`SELECT ${row} FROM events WHERE jid = $1`, [jid]);
    const jidExists = result.rows.length > 0;

    if (jidExists) {
      return result.rows[0][row];
    } else {
      return 'non';
    }
  } catch (error) {
    console.error("Error retrieving events value:", error);
    return 'non';
  } finally {
    client.release();
  }
}

module.exports = {
  setValue,
  getEventsValue,
};
