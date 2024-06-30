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

// Function to create the "warn_users" table if it doesn't exist
async function createWarnUsersTable() {
  const client = await pool.connect();
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS warn_users (
        jid text PRIMARY KEY,
        warn_count integer DEFAULT 0
      );
    `;
    await client.query(query);
    console.log("The 'warn_users' table was created successfully.");
  } catch (error) {
    console.error("Error creating the 'warn_users' table:", error);
  } finally {
    client.release();
  }
}

// Call the function to create the "warn_users" table
createWarnUsersTable();

// Function to add or update a user with a warn_count
async function addUserWithWarnCount(jid) {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO warn_users (jid, warn_count)
      VALUES ($1, 1)
      ON CONFLICT (jid)
      DO UPDATE SET warn_count = warn_users.warn_count + 1;
    `;
    const values = [jid];

    await client.query(query, values);
    console.log(`User ${jid} added or updated with a warn_count of 1.`);
  } catch (error) {
    console.error("Error adding or updating the user:", error);
  } finally {
    client.release();
  }
}

// Function to get the warn_count by JID (user ID)
async function getWarnCountByJID(jid) {
  const client = await pool.connect();
  try {
    const query = "SELECT warn_count FROM warn_users WHERE jid = $1";
    const values = [jid];

    const result = await client.query(query, values);
    if (result.rows.length > 0) {
      const warnCount = result.rows[0].warn_count;
      return warnCount;
    } else {
      // If user is not found, return 0 or another default value
      return 0;
    }
  } catch (error) {
    console.error("Error retrieving warn_count:", error);
    return -1; // Return an error value or another default value in case of error
  } finally {
    client.release();
  }
}

// Function to reset the warn_count to 0 for a specific JID (user ID)
async function resetWarnCountByJID(jid) {
  const client = await pool.connect();
  try {
    const query = "UPDATE warn_users SET warn_count = 0 WHERE jid = $1";
    const values = [jid];

    await client.query(query, values);
    console.log(`The warn_count for user ${jid} has been reset to 0.`);
  } catch (error) {
    console.error("Error resetting warn_count:", error);
  } finally {
    client.release();
  }
}

module.exports = {
  addUserWithWarnCount,
  getWarnCountByJID,
  resetWarnCountByJID,
};
