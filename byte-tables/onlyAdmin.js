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

// Function to create the "onlyAdmin" table with a primary key on 'groupeJid'
const createOnlyAdminTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS onlyAdmin (
        groupeJid text PRIMARY KEY
      );
    `);
    console.log("The 'onlyAdmin' table was created successfully.");
  } catch (e) {
    console.error("An error occurred while creating the 'onlyAdmin' table:", e);
  }
};

// Call the function to create the "onlyAdmin" table
createOnlyAdminTable();

// Function to add a group to the list of groups only allowed for admins
async function addGroupToOnlyAdminList(groupeJid) {
  const client = await pool.connect();
  try {
    // Insert the group into the "onlyAdmin" table
    const query = "INSERT INTO onlyAdmin (groupeJid) VALUES ($1)";
    const values = [groupeJid];

    await client.query(query, values);
    console.log(`Group JID ${groupeJid} added to the onlyAdmin groups list.`);
  } catch (error) {
    console.error("Error adding group to onlyAdmin list:", error);
  } finally {
    client.release();
  }
}

// Function to check if a group is in the onlyAdmin list
async function isGroupOnlyAdmin(groupeJid) {
  const client = await pool.connect();
  try {
    // Check if the group exists in the "onlyAdmin" table
    const query = "SELECT EXISTS (SELECT 1 FROM onlyAdmin WHERE groupeJid = $1)";
    const values = [groupeJid];

    const result = await client.query(query, values);
    return result.rows[0].exists;
  } catch (error) {
    console.error("Error checking group in onlyAdmin list:", error);
    return false;
  } finally {
    client.release();
  }
}

// Function to remove a group from the onlyAdmin list
async function removeGroupFromOnlyAdminList(groupeJid) {
  const client = await pool.connect();
  try {
    // Remove the group from the "onlyAdmin" table
    const query = "DELETE FROM onlyAdmin WHERE groupeJid = $1";
    const values = [groupeJid];

    await client.query(query, values);
    console.log(`Group JID ${groupeJid} removed from the onlyAdmin groups list.`);
  } catch (error) {
    console.error("Error removing group from onlyAdmin list:", error);
  } finally {
    client.release();
  }
}

module.exports = {
  addGroupToOnlyAdminList,
  isGroupOnlyAdmin,
  removeGroupFromOnlyAdminList,
};
