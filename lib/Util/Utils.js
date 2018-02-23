
const fs = require('fs');
const xlsx = require('xlsx');
const JS_TO_SQL = {
    'string': "TEXT",
    'boolean': "INTEGER",
    'number': 'INTEGER',
    'Null': 'TEXT',
    'float': 'REAL'
}

const streamToBuffer = async function(stream){
    let buffer = [];
    stream.on('data',(data)=>{
        buffer.push(data)
    });
    return new Promise((resolve,reject)=>{

        stream.on('end',()=>{
            resolve(Buffer.concat(buffer))
        });

        stream.on('error',(error)=>{
            reject(error)
        });
    });
}

const JsPrimitiveToSqliteType = (value) => {

    let type = typeof data
    if (isFloat(data)) {
        type = 'float'
    }
    const sql_type = JS_TO_SQL[type];
    if (sql_type) {
        return sql_type;

    }

    return 'TEXT';


}
const getSheetsFromExcelWorkBook = (excelFilePath) =>{

    const buffer = fs.readFileSync(excelFilePath);
    const excelWorkBook =xlsx.read(buffer,{type:"buffer"});
    const sheetNames = excelWorkBook.SheetNames;
    const sheets = sheetNames.map( sn => {
        return {name:sn,sheet:excelWorkBook.Sheets[sn] }
    })

    return sheets;

}

const mapRowsToSqliteColumns = (rows) =>{
    return ""
}

module.exports = {
    mapRowsToSqliteColumns,
    getSheetsFromExcelWorkBook
}


/*
check if intenger or float
credits:https://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer
*/
const isInt = (n) => {
    return Number(n) === n && n % 1 === 0;
}

const isFloat = (n) => {
    return Number(n) === n && n % 1 !== 0;
}