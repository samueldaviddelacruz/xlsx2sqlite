const {
  mapRowsToSqliteColumns,
  getSheetsFromExcelWorkBook
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
      const sheetJsons = getSheetsFromExcelWorkBook("test.xlsx").map(data => {
        return {
          sheetName: data.name,
          jsonRows: xlsx.utils.sheet_to_json(data.sheet, { defval: "" })
        };
      });     
      const columns = mapRowsToSqliteColumns(sheetJsons[0].jsonRows);
      columns.length.should.be.greaterThan(0);
      
    });
  });
});
