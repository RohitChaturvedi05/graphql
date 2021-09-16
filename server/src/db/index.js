import memoize from 'lodash/fp/memoize';
import once from 'lodash/fp/once';
import { MongoClient } from 'mongodb';
import DBNames from './constants/db-name';
import logger from '../logger';

export const getClient = once(async () => {
  const connectionString = process.env.MONGO_CONECTION_STRING;
  logger(`connecting mongodb... ${connectionString}`);
  try {
    const client = new MongoClient(connectionString);
    await client.connect();
    logger('mongodb connected successfully!');
    return client;
  } catch (err) {
    logger(`Unable to connect to mongodb, ${err.message}`);
    process.exit();
  }
});

export const getDB = memoize(async (dbName = DBNames.GRAPHQL) => {
  const client = await getClient();

  logger(`using db, ${dbName}`);
  return client.db(dbName);
});

export const getCollection = async (collection) => {
  const db = await getDB();
  return db.collection(collection);
};
