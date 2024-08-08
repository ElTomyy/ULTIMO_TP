import pg from 'pg';

// Destructure Client class from the pg module
const { Client } = pg;

// Define the connection string to connect to the PostgreSQL database
const connectionString = "postgresql://actividad_user:fmADvuVm8E37OtI3aqBYr4pE6s795aDX@dpg-cqlqe4tumphs739jt5vg-a.oregon-postgres.render.com/actividad?ssl=true";

// Define an asynchronous function to insert data into the empleados table
async function insertData() {
  const client = new Client({ connectionString });
  try {
    // Establish a connection to the database
    await client.connect();
    console.log('Connected to the database.');

    // Insert data into the empleados table
    await client.query(`
      INSERT INTO empleados (nombre, edad, puesto) VALUES
      ('Pablo Escobar', 88 , 'Narcotraficante');
    `);

    console.log('La pusisre correctamente');
  } catch (error) {
    // Log any errors that occur during data insertion
    console.error('Error al ponerla: ', error.message);
    console.error('Detalles de la antiponedura:', error);
  } finally {
    // Close the client connection when done
    await client.end();
  }
}

// Execute the function to insert data
insertData();