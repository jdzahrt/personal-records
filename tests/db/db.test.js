import { GetDbConnection, getCollection, _resetClient } from '../../src/db/db';

const { MongoClient } = require('mongodb');

jest.mock('mongodb');

beforeEach(() => {
  MongoClient.connect.mockClear();
});

afterEach(() => {
  jest.resetAllMocks();
  if (_resetClient) {
    _resetClient();
  }
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

  test('getCollection returns collection when connected', async () => {
    const mockCollection = {};
    const client = {
      db: jest.fn().mockReturnValue({
        collection: jest.fn().mockReturnValue(mockCollection),
      }),
    };
    MongoClient.connect.mockReturnValue(client);

    const col = await getCollection('test');
    expect(col).toBe(mockCollection);
  });

  test('getCollection throws when connection fails', async () => {
    const error = 'Connection dropped';
    MongoClient.connect.mockRejectedValue(error);

    await expect(getCollection('test')).rejects.toThrow('Could not connect. Connection dropped');
  });
});
