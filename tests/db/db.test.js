import { GetDbConnection } from '../../src/db/db';

const { MongoClient } = require('mongodb');

jest.mock('mongodb');

beforeEach(() => {
  MongoClient.connect.mockClear();
});

afterEach(() => {
  jest.resetAllMocks();
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

  test('failure test', async () => {
    const error = 'MongoClient Down';
    MongoClient.connect.mockRejectedValue(error);

    const newOne = await GetDbConnection();

    expect(newOne).toEqual(new Error(`Could not connect. ${error}`));
  });

  test('connection should only be initialized once', async () => {
    const client = { db: jest.fn().mockReturnThis(), collection: jest.fn() };
    MongoClient.connect.mockReturnValue(client);

    await GetDbConnection();
    await GetDbConnection();

    expect(MongoClient.connect).toHaveBeenCalledTimes(1);
  });
});
