const MongoClient = require('mongodb').MongoClient;

export const getMongoClient = async () => {
    const url = process.env.MONGO_DATABASE_URL;

    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    return client
}
