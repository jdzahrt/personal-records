const { MongoClient } = require('mongodb');

function DbConnection() {
  let db = null;

  const url = process.env.MONGO_DATABASE_URL;
  const dbInstance = 'personal-records';

  async function DbConnect() {
    try {
      return await MongoClient.connect(
        url,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      );
    } catch (e) {
      throw new Error(`Could not connect. ${e}`);
    }
  }

  async function GetDbConnection() {
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
    GetDbConnection,
  };
}

module.exports = DbConnection();
