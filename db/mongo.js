const MongoClient = require('mongodb').MongoClient;

export const getMongoClient = async () => {
    const url = process.env.MONGO_DATABASE_URL;

    const dbName = 'personal-records';

    const client = new MongoClient(url);

    await client.connect();

    return client.db(dbName);
}
