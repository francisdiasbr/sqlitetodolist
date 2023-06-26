import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {TodoItemProps} from '../models';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'todo-data.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS todoData(
    value TEXT NOT NULL
  );`;

  await db.executeSql(query);
};

export const getTodoItems = async (
  db: SQLiteDatabase,
): Promise<TodoItemProps[]> => {
  try {
    const todoItems: TodoItemProps[] = [];
    const results = await db.executeSql(
      'SELECT rowid as id, value FROM todoData',
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index));
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems');
  }
};

export const saveTodoItems = async (
  db: SQLiteDatabase,
  todoItems: TodoItemProps[],
) => {
  const insertQuery =
    'INSERT OR REPLACE INTO todoData(rowid, value) values' +
    todoItems.map(i => `(${i.id}, '${i.value}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from todoData where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};
