import { GraphQLString } from 'graphql/type';
import UserType from '../types/user';
import UsersDB from '../../db/users.json';
import Collections from '../../db/constants/collections';

const args = {
  firstname: {
    type: GraphQLString
  },
  lastname: {
    type: GraphQLString
  },
  email: {
    type: GraphQLString
  }
};

export default {
  type: UserType,
  args,
  resolve: async (parent, args, context) => {
    const { firstname, lastname, email } = args;
    const user = { firstname, lastname, email };
    const { insertedId } = await context.db
      .collection(Collections.USERS)
      .insertOne(user);

    console.log({ _id: insertedId, ...user });

    return { _id: insertedId, ...user };
  }
};
