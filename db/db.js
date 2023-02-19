const { MongoClient } = require('mongodb');

let client = null;
function DbConnection() {
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

const cleanup = (event) => {
  console.log('clizzy', client);
  client.close(); // Close MongodDB Connection when Process ends
  process.exit(); // Exit with default success-code '0'.
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

module.exports = DbConnection();
