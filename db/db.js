const { MongoClient } = require('mongodb');

function DbConnection() {
  let client = null;

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
      if (client != null) {
        return client;
      }

      client = await DbConnect();
      client = client.db(dbInstance);

      return client;
    } catch (e) {
      return e;
    }
  }

  return {
    GetDbConnection,
  };
}

module.exports = DbConnection();
