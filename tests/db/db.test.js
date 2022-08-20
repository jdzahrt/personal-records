import { GetDbConnection } from '../../db/db';

const { MongoClient } = require('mongodb');

jest.mock('mongodb');

describe('db', () => {
  test('connection', () => {
    GetDbConnection();

    expect(MongoClient.connect).toHaveBeenCalledTimes(1);
    expect(MongoClient.connect).toHaveBeenCalledWith(process.env.MONGO_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
});
