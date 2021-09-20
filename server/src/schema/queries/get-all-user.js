import { GraphQLObjectType, GraphQLList, GraphQLInt } from 'graphql/type';
import slice from 'lodash/fp/slice';
import UserType from '../types/user';
import Collections from '../../db/constants/collections';

const args = {
    page: {
        type: GraphQLInt,
    },
    pageSize: {
        type: GraphQLInt,
    },
};

const ResponseType = new GraphQLObjectType({
    name: 'ALL_USERS',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
        },
        rowsCount: {
            type: GraphQLInt,
        },
    }),
});

export default {
    type: ResponseType,
    args,
    resolve: async (parent, args, context, info) => {
        const users = await context.db
            .collection(Collections.USERS)
            .find()
            .toArray();
        const rowsCount = users.length;
        const { page = -1, pageSize = -1 } = args;
        if (page <= 0 || pageSize <= 0) {
            return {
                users: slice(start, end, users),
                rowsCount,
            };
        }
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        return {
            users: slice(start, end, users),
            rowsCount,
        };
    },
};
