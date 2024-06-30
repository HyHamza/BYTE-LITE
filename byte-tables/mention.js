// Import dotenv and load environment variables from the .env file
require("dotenv").config();

const { Pool } = require("pg");

// Use the 'set' module to get the value of DATABASE_URL from your configurations
const s = require("../set");

// Retrieve the database URL from the s.DATABASE_URL variable
const dbUrl = s.DATABASE_URL ? s.DATABASE_URL : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9";
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Create a pool of PostgreSQL connections
const pool = new Pool(proConfig);

// Function to create the "mention" table with columns "id", "status", "url", "type", "message"
async function createMentionTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS mention (
        id serial PRIMARY KEY,
        status text DEFAULT 'non',
        url text,
        type text,
        message text
      );
    `);
    console.log("The 'mention' table was created successfully.");
  } catch (e) {
    console.error("An error occurred while creating the 'mention' table:", e);
  } finally {
    client.release();
  }
}

// Call the function to create the "mention" table during initialization
createMentionTable();

// Function to add or update data in the "mention" table
async function addOrUpdateDataInMention(url, type, message) {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO mention (id, url, type, message)
      VALUES (1, $1, $2, $3)
      ON CONFLICT (id)
      DO UPDATE SET url = excluded.url, type = excluded.type, message = excluded.message;
    `;
    const values = [url, type, message];

    await client.query(query, values);
    console.log("Data added or updated in the 'mention' table successfully.");
  } catch (error) {
    console.error("Error adding or updating data in the 'mention' table:", error);
  } finally {
    client.release();
  }
}

// Function to modify the status for ID 1 in the "mention" table
async function modifyStatusId1(newStatus) {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE mention
      SET status = $1
      WHERE id = 1;
    `;
    const values = [newStatus];

    await client.query(query, values);
    console.log("Status modified successfully for ID 1 in the 'mention' table.");
  } catch (error) {
    console.error("Error modifying status for ID 1 in the 'mention' table:", error);
  } finally {
    client.release();
  }
}

// Function to retrieve all values from the "mention" table
async function getAllValues() {
  const client = await pool.connect();
  try {
    const query = `
      SELECT * FROM mention;
    `;

    const result = await client.query(query);
    console.log("Here are all the values from the 'mention' table:", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error retrieving values from the 'mention' table:", error);
  } finally {
    client.release();
  }
}

module.exports = {
  addOrUpdateDataInMention,
  getAllValues,
  modifyStatusId1,
};
