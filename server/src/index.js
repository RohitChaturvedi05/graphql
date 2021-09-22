import Dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { getClient as initClient, getDB } from './db';
import schema from './schema';
import logger from './logger';
import testDB from './db/test-db';
import authGenerateToken from './auth/generate';
import authenticateToken from './auth/verify';
import getOr from 'lodash/fp/getOr';

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

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.post('/login', (req, res) => {
        const username = getOr('', 'body.username', req)
        if (username === 'rchaturvedi') {
            const token = authGenerateToken(username);
            return res.status(200).json(token)
        }
        return res.status(403).json({ message: 'Invalid user, Unable to generate token', status: 403 })
    });

    app.use(
        '/graphql',
        authenticateToken,
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
