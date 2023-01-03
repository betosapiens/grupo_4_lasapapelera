const fs = require('fs');
const path = require('path');


/*const model = function(tableName) {
    
    

    return {
        filePath: path.join(__dirname, '../data/' + tableName + '.json'),
        
        readFile: function() {
            return JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
        },

        writeFile: function(contents) {
            let fileContents = JSON.stringify(contents, null, " ");
            fs.writeFileSync(this.filePath, fileContents);
        },

        nextId: function() {
            let rows = this.readFile();
            let lastRow = rows.pop();

            if (lastRow) {
                return ++lastRow.id;
            }

            return 1;
        },

        all: function() {
            return this.readFile();
        },

        find: function(id) {
            let rows = this.readFile();
            return rows.find(row => row.id == id)
        },
        create: function(row) {
            let rows = this.readFile();
            row.id = this.nextId();
            rows.push(row);

            this.writeFile(rows);

            return row.id;
        },

        update: function(row) {
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
            return this.readFile();
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
}*/

//----------------------------------------------------------------------------------------------------------------------

const User = {
	 fileName: path.join(__dirname, '../data/users.json'),

	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

	generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
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

	create: function (userData) {
		let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
			...userData
		}
		allUsers.push(newUser);
		fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,  ' '));
		return newUser;
	},

	delete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
		fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
		return true;
	}
}

module.exports = User
//module.exports = model;