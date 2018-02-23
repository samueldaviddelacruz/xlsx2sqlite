
const chai = require('chai')
const { createDatabase, createTable } = require('../lib/index');

const fs = require('fs');
const should = chai.should()


const fileName = "employee"
const extension = "sqlite3"
const columns = [
     { 'columnName': 'name', type: 'TEXT' }
    ,{ 'columnName': 'lastName', type: 'TEXT' }
    ,{ 'columnName': 'age', type: 'INTEGER' },
     { 'columnName': 'salary', type: 'REAL' }]
const tableName = "employee"
describe('main functions', () => {
    before(function () {

        if (fs.existsSync(`${fileName}.${extension}`)) {

            fs.unlinkSync(`${fileName}.${extension}`)
        }
        // runs before all tests in this block
    });

    describe('database creation', () => {

        describe('createDatabase', () => {

            it('should create a database with a given string name', () => {

                const createdDb = createDatabase(fileName);

                createdDb.should.exist

                fs.existsSync(`${fileName}.${extension}`).should.equal(true)

            });

        });

    });

    describe('table creation', () => {

        describe('createTable', () => {

            it('should create a table in an open database', () => {

                const createdDb = createDatabase(fileName);
                const dbChanges = createTable(createdDb, tableName, columns);
                dbChanges.changes.should.exist;

            });

        });
    
    });

})




