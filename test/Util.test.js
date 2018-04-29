const {
  mapRowsToSqliteColumns,
  getSheetsFromExcelWorkBook,
  getTablesFromSheets
} = require("../lib/Util/Utils");
const chai = require("chai");
const xlsx = require("xlsx");
const fs = require("fs");

const should = chai.should();

describe("util functions", () => {
  describe("getSheetsFromWorkBook", () => {
    it("should return an array of sheets", () => {
      let sheets = [];
      sheets = getSheetsFromExcelWorkBook("test.xlsx");

      sheets.length.should.be.greaterThan(0);
    });
  });
  describe("mapRowsToSqliteColumns", () => {
    it("should return an Array of sql types columns", async () => {
      const sheetJsons = getSheetsFromExcelWorkBook("test.xlsx");     
      const columns = mapRowsToSqliteColumns(sheetJsons[0].jsonRows);
      columns.length.should.be.greaterThan(0);
      
    });
  });
  describe("getTablesFromSheets", () => {
    it("should return an array of Table Objects", async () => {
      const sheetJsons = getSheetsFromExcelWorkBook("test.xlsx");     
      const tables = getTablesFromSheets(sheetJsons);
      tables[0].columns.length.should.be.greaterThan(0);
      tables[0].rows.length.should.be.greaterThan(0);

    });
  });

});
