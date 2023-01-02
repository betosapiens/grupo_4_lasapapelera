const fs = require('fs');
const path = require('path');


let model = function(tableName) {
    
    return {
        filePath: path.join(__dirname, '../data/' + tableName + '.json'),
        readFile() {
            let fileContents = fs.readFileSync(this.filePath, 'utf8');
        
            if(fileContents) {
                return JSON.parse(fileContents);
            }
        
            return [];
        },
        writeFile(contents) {
            let fileContents = JSON.stringify(contents, null, " ");
            fs.writeFileSync(this.filePath, fileContents);
        },
        nextId() {
            let rows = this.readFile();
            let lastRow = rows.pop();

            if (lastRow) {
                return ++lastRow.id;
            }

            return 1;
        },
        all() {
            return this.readFile();
        },
        find(id) {
            let rows = this.readFile();
            return rows.find(row => row.id == id)
        },
        create(row) {
            let rows = this.readFile();
            row.id = this.nextId();
            rows.push(row);

            this.writeFile(rows);

            return row.id;
            let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
			...userData
		}

		allUsers.push(newUser);
		fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,  ' '));
		return newUser;
        },
        
        getData: function () {
            return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
        },

        update(row) {
            let rows = this.readFile();
            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    return row;
                }

                return oneRow;
            }); 

            this.writeFile(updatedRows);

            return row.id;
        },

        findAll: function () {
            return this.getData();
        },

        findByPk: function (id) {
            let allUsers = this.findAll();
            let userFound = allUsers.find(oneUser => oneUser.id === id);
            return userFound;
        },
    
        findByField: function (field, text) {
            let allUsers = this.findAll();
            let userFound = allUsers.find(oneUser => oneUser[field] === text);
            return userFound;
        },
    
        delete(id) {
            let rows = this.readFile();
            let updatedRows = rows.filter(oneRow => oneRow.id != id); 

            this.writeFile(updatedRows);
        }
    }
}

module.exports = model;