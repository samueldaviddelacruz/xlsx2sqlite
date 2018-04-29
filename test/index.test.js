const chai = require("chai");
const {
  createDatabase,
  createTable,
  insertIntoTable
} = require("../lib/index");
const {
  getSheetsFromExcelWorkBook,
  getTablesFromSheets
} = require("../lib/Util/Utils");
const fs = require("fs");
const should = chai.should();

const databaseName = "employee";
const extension = "sqlite3";
const columns = [
  { columnName: "name", type: "TEXT" },
  { columnName: "lastName", type: "TEXT" },
  { columnName: "age", type: "INTEGER" },
  { columnName: "salary", type: "REAL" }
];
const tableName = "employee";
const deleteDatabaseIfExists = () => {
  if (fs.existsSync(`${databaseName}.${extension}`)) {
    fs.unlinkSync(`${databaseName}.${extension}`);
  }
};
describe("main functions", () => {
  describe("database creation", () => {
    before(function() {
      deleteDatabaseIfExists();
      // runs before all tests in this block
    });
    describe("createDatabase", () => {
      it("should create a database with a given string name", () => {
        const createdDb = createDatabase(databaseName);

        createdDb.should.exist;

        fs.existsSync(`${databaseName}.${extension}`).should.equal(true);
      });
    });
  });

  describe("table creation", () => {
    before(function() {
      deleteDatabaseIfExists();
      // runs before all tests in this block
    });
    describe("createTable", () => {
      it("should create a table in an open database", () => {
        const createdDb = createDatabase(databaseName);
        const dbChanges = createTable(createdDb, tableName, columns);
        dbChanges.changes.should.exist;
      });
    });
  });
  describe("create and populate database tables", () => {
    before(function() {
      deleteDatabaseIfExists();
      // runs before all tests in this block
    });
    describe("create a database with multiple tables", () => {
      it("should create a database with multiple tables and insert rows", () => {
        const createdDb = createDatabase(databaseName);
        const sheetJsons = getSheetsFromExcelWorkBook("test.xlsx");
        const tables = getTablesFromSheets(sheetJsons);
        for (const table of tables) {
          const dbChanges = createTable(
            createdDb,
            table.tableName,
            table.columns
          );
          dbChanges.changes.should.exist;
          for (const rowValues of table.rows) {
            const tableChanges = insertIntoTable(
              createdDb,
              table.tableName,
              table.columns,
              rowValues
            );
            tableChanges.changes.should.exist;
          }
        }
      });
    });
  });
});
