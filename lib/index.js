
//const xslt = require('xlsx')
const Database = require('better-sqlite3')

const createDatabase = function (databaseName) {
    try {
        const db = new Database(`${databaseName}.sqlite3`);
        return db;
    } catch (error) {

        throw error
        return;
    }
}

const createTable = function (database,tableName,columns) {
    try{
        const sql= prepareCreateTableSql(tableName,columns);
        const preparedStatement = database.prepare(sql);
        return preparedStatement.run();
    }catch(error){
        throw error;
        return;
    }
    return ""
}

const prepareCreateTableSql = function(tableName,columns){
    const columnsDefinitions = columns.map(c =>{
        return `${c.columnName} ${c.type}`
    }).join(', ');
    const sql = `CREATE TABLE ${tableName}(${columnsDefinitions});`
    return sql;
}


module.exports = {
    createDatabase,
    createTable
}