import { GetDbConnection } from '../../db/db';

const { MongoClient } = require('mongodb');

jest.mock('mongodb');

beforeEach(() => {
  MongoClient.connect.mockClear();
});

describe('db', () => {
  test('connection', async () => {
    await GetDbConnection();

    expect(MongoClient.connect).toHaveBeenCalledTimes(1);
    expect(MongoClient.connect).toHaveBeenCalledWith(process.env.MONGO_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  test('connection should only be initialized once', async () => {
    const client = { db: jest.fn().mockReturnThis(), collection: jest.fn() };
    MongoClient.connect.mockReturnValue(client);

    await GetDbConnection();
    await GetDbConnection();

    expect(MongoClient.connect).toHaveBeenCalledTimes(1);
  });

  test('failure', async () => {
    const error = 'MongoClient Down';
    MongoClient.connect.mockRejectedValue(error);

    const newOne = await GetDbConnection();

    expect(newOne).toEqual(new Error(`Could not connect. ${error}`));
  });
});
