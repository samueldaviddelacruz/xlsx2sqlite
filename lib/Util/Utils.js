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
  let type = typeof value;
  if (isFloat(value)) {
    type = "float";
  }
  if (isInt(value)) {
    type = "number";
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

  return sheets;
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

module.exports = {
  mapRowsToSqliteColumns,
  getSheetsFromExcelWorkBook
};

const isInt = n => {
  return !isNaN(n) && Number(n) % 1 === 0;
};

const isFloat = n => {
  return !isNaN(n) && Number(n) % 1 !== 0;
};
