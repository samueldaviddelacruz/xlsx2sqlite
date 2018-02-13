
//const xslt = require('xlsx')
const Database = require('better-sqlite3')

const createDatabase = function (databaseName) {
    try {
        const db = new Database(databaseName);
        return db;
    } catch (error) {

        throw error
        return;
    }
}




module.exports = {
    createDatabase
}