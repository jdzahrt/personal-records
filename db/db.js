const { MongoClient } = require('mongodb');

function DbConnection() {
  let db = null;

  const url = process.env.MONGO_DATABASE_URL;
  const dbInstance = 'personal-records';

  async function DbConnect() {
    try {
      return MongoClient.connect(
        url,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      );
    } catch (e) {
      return e;
    }
  }

  async function Get() {
    try {
      if (db != null) {
        return db;
      }

      db = await DbConnect();
      db = db.db(dbInstance);

      return db;
    } catch (e) {
      return e;
    }
  }

  return {
    GetDbConnection: Get,
  };
}

module.exports = DbConnection();
