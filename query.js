import pg from 'pg';

// Destructure Client class from the pg module
const { Client } = pg;

// Define the connection string to connect to the PostgreSQL database
const connectionString = "postgresql://actividad_user:fmADvuVm8E37OtI3aqBYr4pE6s795aDX@dpg-cqlqe4tumphs739jt5vg-a.oregon-postgres.render.com/actividad?ssl=true";


// Define an asynchronous function to query and display data from the empleados table
async function queryData() {
  const client = new Client({ connectionString });
  try {
    // Establish a connection to the database
    await client.connect();
    console.log('Conectado a la base de datos.');

    // Query the empleados table
    const res = await client.query('SELECT * FROM empleados;');

    // Display the results
    console.log('Resultados query:', res.rows);
  } catch (error) {
    // Log any errors that occur during querying
    console.error('Error al buscar data:', error.message);
    console.error('Detalles del error:', error);
  } finally {
    // Close the client connection when done
    await client.end();
  }
}

// Execute the function to query and display data
queryData();