const { MongoClient } = require('mongodb');

function DbConnection() {
  let db = null;
  let instance = 0;

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
      instance += 1;
      console.log(`DbConnection called ${instance} times`);

      if (db != null) {
        console.log('db connection is already alive');
        return db;
      }
      console.log('getting new db connection');
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
