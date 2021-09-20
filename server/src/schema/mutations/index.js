import { GraphQLObjectType } from 'graphql/type';
import addUser from './add-user';
import deleteUser from './delete-user';
import updateUser from './update-user';

export default new GraphQLObjectType({
    name: 'MUTATIONS',
    fields: { addUser, deleteUser, updateUser },
});
