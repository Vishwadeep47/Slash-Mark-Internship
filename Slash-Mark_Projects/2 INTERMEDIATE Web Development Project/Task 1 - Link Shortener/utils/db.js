const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../database.json');

// Initialize DB if not exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

const readDB = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

const findOne = (query) => {
    const db = readDB();
    return db.find(item => {
        for (let key in query) {
            if (item[key] !== query[key]) return false;
        }
        return true;
    });
};

const save = (doc) => {
    const db = readDB();
    db.push(doc);
    writeDB(db);
    return doc;
};

module.exports = {
    findOne,
    save
};
