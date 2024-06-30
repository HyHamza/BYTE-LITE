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

const pool = new Pool(proConfig);

// Function to create the "stickcmd" table with a primary key on 'cmd'
async function createStickcmdTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS stickcmd (
        cmd text PRIMARY KEY,
        id text NOT NULL
      );
    `);
    console.log("The 'stickcmd' table was created successfully.");
  } catch (e) {
    console.error("An error occurred while creating the 'stickcmd' table:", e);
  }
}

// Call the function to create the "stickcmd" table
createStickcmdTable();

// Function to add a command with an ID to the "stickcmd" table
async function addStickcmd(cmd, id) {
  let client;
  try {
    client = await pool.connect();
    const query = "INSERT INTO stickcmd(cmd, id) VALUES ($1, $2)";
    const values = [cmd, id];
    await client.query(query, values);
    console.log(`The stickcmd '${cmd}' was successfully added.`);
  } catch (error) {
    console.log('Error adding stickcmd:', error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

// Function to check if a command exists by ID in the "stickcmd" table
async function isStickcmdInTable(id) {
  let client;
  try {
    client = await pool.connect();
    const query = "SELECT  EXISTS (SELECT 1 FROM stickcmd WHERE id = $1)";
    const values = [id];
    const result = await client.query(query, values);
    return result.rows[0].exists;
  } catch (error) {
    return false;
  } finally {
    if (client) {
      client.release();
    }
  }
}

// Function to delete a command from the "stickcmd" table by its text
async function deleteStickcmd(cmd) {
  const client = await pool.connect();
  try {
    const query = "DELETE FROM stickcmd WHERE cmd = $1";
    const values = [cmd];
    await client.query(query, values);
    console.log(`The stickcmd '${cmd}' was successfully deleted.`);
  } catch (error) {
    console.error("Error deleting stickcmd:", error);
  } finally {
    client.release();
  }
}

// Function to get a command by its ID from the "stickcmd" table
async function getStickcmdById(id) {
  let client;
  try {
    client = await pool.connect();
    const query = "SELECT cmd FROM stickcmd WHERE id = $1";
    const values = [id];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      return result.rows[0].cmd;
    } else {
      return null; // Adjust return value accordingly if ID is not found.
    }
  } catch (error) {
    console.error("Error retrieving stickcmd by ID:", error);
    return null; // Handle error and adjust return value if necessary.
  } finally {
    if (client) {
      client.release();
    }
  }
}

// Function to get all commands stored in the "stickcmd" table
async function getAllStickcmds() {
  const client = await pool.connect();
  try {
    const query = "SELECT cmd FROM stickcmd";
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error retrieving all stickcmds:", error);
    return [];
  } finally {
    client.release();
  }
}

module.exports = {
  addStickcmd,
  deleteStickcmd,
  getStickcmdById,
  isStickcmdInTable,
  getAllStickcmds,
};
