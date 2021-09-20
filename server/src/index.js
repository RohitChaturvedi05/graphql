import Dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { getClient as initClient, getDB } from './db';
import schema from './schema';
import logger from './logger';
import testDB from './db/test-db';

Dotenv.config();
(async function () {
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || 'localhost';
    const graphiql = process.env.GRAPHIQL === 'true';
    logger(
        `initializing server, port: ${port}, host: ${host}, graphiql: ${graphiql}`
    );

    const app = express();
    const client = await initClient();
    const db = await getDB();

    app.use(cors());
    app.use(
        '/graphql',
        graphqlHTTP({
            schema,
            graphiql,
            context: { client, db },
        })
    );
    await testDB();

    app.listen(port, host, () =>
        logger(`Server started on http://${host}:${port}/graphql`)
    );
})().catch((err) => logger(err.message, logger.Type.Error));
