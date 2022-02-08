const MongoClient = require('mongodb').MongoClient;

export const getMongoClient = async () => {
    const url = process.env.MONGO_DATABASE_URL;

    return await MongoClient.connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
        .catch(err => {
            console.log(err);
        });
}
