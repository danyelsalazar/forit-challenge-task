import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const initialtDB = async () => {

  // Genero una ruta absoluta segura
  const dbPath = process.env.DB_PATH || path.resolve(process.cwd(), "database.sqlite");

  const db = await open({
    filename: dbPath, 
    driver: sqlite3.Database,
  });

  // creo la tabla
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT 0,
      createdAt TEXT
    )
  `);

    //   verifico si hay datos en la tabla asi agrego una precarga
    const row = await db.get(`SELECT COUNT(*) as count FROM tasks`)

    if(row.count === 0){
        console.log("Cargando datos a la base de datos");

        await db.run(`
    INSERT INTO tasks (title, description, completed, createdAt) VALUES
    ('Entrega Proyecto Final', 'Subir el repo a la plataforma', 0, '${new Date().toISOString()}'),
    ('Comprar víveres', 'Leche, huevos, frutas', 1, '${new Date().toISOString()}'),
    ('Estudiar Álgebra', 'Matrices y ecuaciones', 0, '${new Date().toISOString()}'),
    ('Gimnasio', 'Pierna + cardio', 0, '${new Date().toISOString()}'),
    ('Resumen Historia', 'Capítulos 3 y 4', 1, '${new Date().toISOString()}')
  `)
        
    }

  console.log("base de datos conectada");

  return db;
};