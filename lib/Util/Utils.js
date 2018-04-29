const fs = require("fs");
const xlsx = require("xlsx");
const JS_TO_SQL = {
  string: "TEXT",
  boolean: "INTEGER",
  number: "INTEGER",
  float: "REAL"
};

const streamToBuffer = async function(stream) {
  let buffer = [];
  stream.on("data", data => {
    buffer.push(data);
  });
  return new Promise((resolve, reject) => {
    stream.on("end", () => {
      resolve(Buffer.concat(buffer));
    });

    stream.on("error", error => {
      reject(error);
    });
  });
};

const JsPrimitiveToSqliteType = value => {
  const type = typeof value;
  if (isFloat(value)) {
    return JS_TO_SQL["float"];
  }
  if (isInt(value)) {
    return JS_TO_SQL["number"];
  }
  return JS_TO_SQL[type] || "TEXT";
};
const getSheetsFromExcelWorkBook = excelFilePath => {
  const buffer = fs.readFileSync(excelFilePath);
  const excelWorkBook = xlsx.read(buffer, { type: "buffer" });
  const sheetNames = excelWorkBook.SheetNames;
  const sheets = sheetNames.map(sn => {
    return { name: sn, sheet: excelWorkBook.Sheets[sn] };
  });

  return sheets.map(data => {
    return {
      sheetName: data.name,
      jsonRows: xlsx.utils.sheet_to_json(data.sheet, { defval: "" })
    };
  });
};

const mapRowsToSqliteColumns = rows => {
  const columns = Object.keys(rows[0] || []).map(objectKey => {
    const column = {
      columnName: objectKey,
      type: JsPrimitiveToSqliteType(rows[0][objectKey])
    };
    return column;
  });

  return columns;
};
const getTablesFromSheets = sheets => {
  const tables = sheets.map(sheet => {
    const table = {
      tableName: sheet.sheetName,
      columns: mapRowsToSqliteColumns(sheet.jsonRows),
      rows: sheet.jsonRows
    };
    return table;
  });
  return tables;
};

module.exports = {
  mapRowsToSqliteColumns,
  getSheetsFromExcelWorkBook,
  getTablesFromSheets
};

const isInt = n => {
  return !isNaN(n) && Number(n) % 1 === 0;
};

const isFloat = n => {
  return !isNaN(n) && Number(n) % 1 !== 0;
};
