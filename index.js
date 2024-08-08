import pg from 'pg';

const connectionString = "postgresql://actividad_user:fmADvuVm8E37OtI3aqBYr4pE6s795aDX@dpg-cqlqe4tumphs739jt5vg-a.oregon-postgres.render.com/actividad?ssl=true";

const { Client } = pg;

// Create a new Client instance with the connection string
const client = new Client({
    connectionString,
  });
  
  // Define an asynchronous function to create a table using a single client connection
  async function createTableWithClient() {
    try {
      // Establish a connection to the database
      await client.connect();
      console.log('Conectado a la base de datos');
  
      // Execute the SQL query to create the table if it does not exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS empleados (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          edad INTEGER NOT NULL,
          puesto VARCHAR(100) NOT NULL
        );
      `);
  
      console.log('Tabla "empleados" creada o ya existe');
  
      // Call the function to insert data after creating the table
      await insertData();
    } catch (error) {
      // Log any errors that occur during table creation
      console.error('Error crafteando la tabla: ', error.message);
      console.error('Detalles del error:', error);
    } finally {
      // Close the client connection when done
      await client.end();
    }
  }
  
  // Define an asynchronous function to insert data into the empleados table
  async function insertData() {
    try {
      // Reconnect to the database to perform data insertion
      await client.connect();
      console.log('Conectado a la base de datos');
  
      // Insert data into the empleados table
      await client.query(`
        INSERT INTO empleados (nombre, edad, puesto) VALUES
        ('Marcos', 16, 'Asistente'),
        ('Geronimo', 56, 'Detective'),
        ('Martin', 23, 'Nadador');
      `);
  
      console.log('Informacion insertada');
    } catch (error) {
      // Log any errors that occur during data insertion
      console.error('Error al poner la data: ', error.message);
      console.error('Detalles del error:', error);
    } finally {
      // Close the client connection when done
      await client.end();
    }
  }
  
  // Call the function to create the table
  createTableWithClient();