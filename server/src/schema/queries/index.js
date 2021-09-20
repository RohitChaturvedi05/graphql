import { GraphQLObjectType } from 'graphql/type';
import getAllUsers from './get-all-user';
import getUser from './get-user';

export default new GraphQLObjectType({
    name: 'ROOT_QUERY',
    fields: {
        getAllUsers,
        getUser,
    },
});
