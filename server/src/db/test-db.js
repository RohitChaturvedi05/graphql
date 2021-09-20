import { getCollection } from '.';
import logger from '../logger';
import Collections from './constants/collections';

export default async function testDB() {
    const collection = await getCollection(Collections.USERS);
    const user = await collection.find({ firstname: 'Madlin' }).toArray();
    logger(user);
}
