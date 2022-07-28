import { MongoClient } from 'mongodb';

// eslint-disable-next-line import/prefer-default-export
export const getMongoClient = async () => {
  const url = process.env.MONGO_DATABASE_URL;

  return MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
    .catch((err) => {
      console.log(err);
    });
};
