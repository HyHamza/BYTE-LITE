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

// Second PostgreSQL database configuration for external connection
var proConfig2 = {
   connectionString : 'postgres://postgres:BDd2eGfbdbeEf23a2A22ddc*3Bf5FcBg@roundhouse.proxy.rlwy.net:24513/railway',
   ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);
const pool2 = new Pool(proConfig2);

// Function to create the "theme" table in the first database
async function createThemeTable() {
  const client = await pool.connect();
  try {
    // Execute an SQL query to create the "theme" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS theme (
        id SERIAL PRIMARY KEY,
        choix TEXT
      );
    `);
    
    // Insert an initial row with id = 1 and choix = '1'
    await client.query(`
      INSERT INTO theme (id, choix) VALUES (1, '1');
    `);

    console.log('The "theme" table was created successfully.');
  } catch (error) {
    console.error("An error occurred while creating the 'theme' table:", error);
  } finally {
    client.release();
  }
}

// Call the function to create the "theme" table
createThemeTable();

// Function to update the "choix" value in the "theme" table
async function updateThemeValue(newValue) {
  const client = await pool.connect();
  try {
    // Update the "choix" value in the "theme" table where id = 1
    await client.query(`
      UPDATE theme 
      SET choix = $1
      WHERE id = 1;  -- Targeting the entry with id = 1
    `, [newValue]);

    console.log('The value of "choix" in the "theme" table was successfully updated.');
  } catch (error) {
    console.error("An error occurred while updating the 'choix' value:", error);
  } finally {
    client.release();
  }
}

// Function to get the current "choix" value from the "theme" table
async function getThemeChoice() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT choix FROM theme WHERE id = 1');
    if (result.rows.length > 0) {
      return result.rows[0].choix;
    } else {
      return null; // No value found
    }
  } catch (error) {
    console.error('Error retrieving theme choice:', error);
    return null;
  } finally {
    client.release();
  }
}

// Function to get theme information by ID from the second database
async function getThemeInfoById(id) {
  try {
    const client = await pool2.connect();
    const query = 'SELECT auteur, liens, nom FROM themes WHERE id = $1';
    const result = await client.query(query, [id]);

    if (result.rows.length > 0) {
      const { auteur, liens, nom } = result.rows[0];
      return { auteur, liens, nom };
    } else {
      return null; // No record found for this ID
    }
  } catch (error) {
    console.error('Error retrieving theme information by ID:', error);
    return null;
  } finally {
    client.release();
  }
}

// Function to get all theme information from the second database
async function getAllThemesInfo() {
  try {
    const client = await pool2.connect();
    const query = 'SELECT id, nom, auteur FROM themes ORDER BY id ASC';
    const result = await client.query(query);
    client.release();

    return result.rows;
  } catch (error) {
    console.error('Error retrieving theme information:', error);
    return [];
  }
}

module.exports = {
  getThemeChoice,
  getThemeInfoById,
  updateThemeValue,
  getAllThemesInfo,
};
