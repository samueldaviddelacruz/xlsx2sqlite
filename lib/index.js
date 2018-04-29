//const xslt = require('xlsx')
const Database = require("better-sqlite3");

const createDatabase = databaseName => {
  try {
    const db = new Database(`${databaseName}.sqlite3`);
    return db;
  } catch (error) {
    throw error;
    return;
  }
};

const createTable = (database, tableName, columns) => {
  try {
    const sql = prepareCreateTableSql(tableName, columns);
    const preparedStatement = database.prepare(sql);
    return preparedStatement.run();
  } catch (error) {
    throw error;
    return;
  }
  return "";
};

const prepareCreateTableSql = (tableName, columns) => {
  const columnsDefinitions = columns
    .map(c => {
      return `${c.columnName} ${c.type}`;
    })
    .join(", ");
  const sql = `CREATE TABLE ${tableName}(${columnsDefinitions});`;
  return sql;
};
const insertIntoTable = (database,tableName, columns,values) =>{
    try {
        const sql = prepareInsertIntoTableSql(tableName, columns);
        const preparedStatement = database.prepare(sql);
        return preparedStatement.run(values);
      } catch (error) {
        throw error;
        return;
      }
      return "";
}
const prepareInsertIntoTableSql = (tableName, columns) => {
  const columnsDefinitions = columns
    .map(c => {
      return `@${c.columnName}`;
    })
    .join(", ");
  const sql = `INSERT INTO ${tableName} VALUES (${columnsDefinitions});`;
  return sql;
};

module.exports = {
  createDatabase,
  createTable,
  insertIntoTable
};
