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

// Function to create the "sudo" table with a primary key on 'id'
async function createSudoTable() {
  const client = await pool.connect();
  try {
    // Execute an SQL query to create the "sudo" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS sudo (
        id serial PRIMARY KEY,
        jid text NOT NULL
      );
    `);
    console.log("The 'sudo' table was created successfully.");
  } catch (error) {
    console.error("An error occurred while creating the 'sudo' table:", error);
  } finally {
    client.release();
  }
}

// Call the function to create the "sudo" table
createSudoTable();

// Function to check if a JID is in the "sudo" table
async function isSudoNumber(jid) {
    const client = await pool.connect();
    try {
      // Check if the JID exists in the "sudo" table
      const query = "SELECT EXISTS (SELECT 1 FROM sudo WHERE jid = $1)";
      const values = [jid];
  
      const result = await client.query(query, values);
      return result.rows[0].exists;
    } catch (error) {
      console.error("Error checking sudo number:", error);
      return false;
    } finally {
      client.release();
    }
  }
  
  // Function to remove a JID from the "sudo" table
  async function removeSudoNumber(jid) {
    const client = await pool.connect();
    try {
      // Delete the JID from the "sudo" table
      const query = "DELETE FROM sudo WHERE jid = $1";
      const values = [jid];
  
      await client.query(query, values);
      console.log(`JID ${jid} removed from the list of authorized JIDs.`);
    } catch (error) {
      console.error("Error removing authorized JID:", error);
    } finally {
      client.release();
    }
  }

  async function addSudoNumber(jid) {
    const client = await pool.connect();
    try {
      // Insert the JID into the "sudo" table
      const query = "INSERT INTO sudo (jid) VALUES ($1)";
      const values = [jid];
  
      await client.query(query, values);
      console.log(`JID ${jid} added to the list of authorized JIDs.`);
    } catch (error) {
      console.error("Error adding authorized JID:", error);
    } finally {
      client.release();
    }
  }

  async function getAllSudoNumbers() {
    const client = await pool.connect();
    try {
      // Select all JIDs from the "sudo" table
      const query = "SELECT jid FROM sudo";
      const result = await client.query(query);
  
      // Create an array of JIDs
      const sudoNumbers = result.rows.map((row) => row.jid);
  
      return sudoNumbers;
    } catch (error) {
      console.error("Error retrieving authorized JIDs:", error);
      return [];
    } finally {
      client.release();
    }
  }  

  // Function to check if the "sudo" table is not empty
  async function isSudoTableNotEmpty() {
    const client = await pool.connect();

    try {
      // Execute an SQL query to count the number of rows in the "sudo" table
      const result = await client.query('SELECT COUNT(*) FROM sudo');

      // Get the value of the counter (number of rows)
      const rowCount = parseInt(result.rows[0].count);

      // If the row count is greater than zero, the table is not empty
      return rowCount > 0;
    } catch (error) {
      console.error('Error checking "sudo" table:', error);
      return false; // In case of error, consider the table as empty
    } finally {
      client.release();
    }
  };
  
  
  
  module.exports = {
    isSudoNumber,
    addSudoNumber,
    removeSudoNumber,
    getAllSudoNumbers,
    isSudoTableNotEmpty
  };
