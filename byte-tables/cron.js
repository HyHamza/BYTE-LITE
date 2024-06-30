require("dotenv").config();
const { Pool } = require("pg");
let s = require("../set");
var dbUrl = s.DATABASE_URL ? s.DATABASE_URL : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9";

const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);

async function createTableCron() {
  const client = await pool.connect();
  try {
    // Execute an SQL query to create the "cron" table if it doesn't already exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS cron (
        group_id text PRIMARY KEY,
        mute_at text DEFAULT NULL,
        unmute_at text DEFAULT NULL
      );
    `);
    console.log("The 'cron' table was created successfully.");
  } catch (error) {
    console.error("An error occurred while creating the 'cron' table:", error);
  } finally {
    client.release();
  }
}

createTableCron();

async function getCron() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM cron');
    return result.rows;
  } catch (error) {
    console.error('Error retrieving data from the "cron" table:', error);
  } finally {
    client.release();
  }
}

async function addCron(group_id, rows, value) {
  const client = await pool.connect();

  try {
    let response = await client.query(`
      SELECT * FROM cron WHERE group_id = $1`, [group_id]);

    let exists = response.rows.length > 0;
    if (exists) {
      await client.query(`
        UPDATE cron SET ${rows} = $1 WHERE group_id = $2 `, [value, group_id]);
    } else {
      const query = `
        INSERT INTO cron (group_id, ${rows}) 
        VALUES ($1, $2)`;

      await client.query(query, [group_id, value]);
    }
  } catch (error) {
    console.error('Error adding data to the "cron" table:', error);
  } finally {
    client.release();
  }
}

async function getCronById(group_id) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM cron WHERE group_id = $1', [group_id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error retrieving data from the "cron" table:', error);
  } finally {
    client.release();
  }
}

async function delCron(group_id) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM cron WHERE group_id = $1', [group_id]);
  } catch (error) {
    console.error('Error deleting data from the "cron" table:', error);
  } finally {
    client.release();
  }
}

module.exports = {
  getCron,
  addCron,
  delCron,
  getCronById,
};
