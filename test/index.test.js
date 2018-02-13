
const chai = require('chai')
const xlsx2Sqlite = require('../lib/index');

const fs =  require('fs');
const should = chai.should()



describe('createDatabase', ()=>{
    
    it('should create a database with a given string name',()=>{
        const fileName = "person.db"
        const createdDb = xlsx2Sqlite.createDatabase(fileName);
        
        createdDb.should.exist

        fs.existsSync(fileName).should.equal(true)
        
    });
})