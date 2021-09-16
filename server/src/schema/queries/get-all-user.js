import { GraphQLList, GraphQLInt } from 'graphql/type';
import slice from 'lodash/fp/slice';
import UserType from '../types/user';
import UsersDB from '../../db/users.json';
import Collections from '../../db/constants/collections';

const args = {
  page: {
    type: GraphQLInt
  },
  pageSize: {
    type: GraphQLInt
  }
};

export default {
  type: new GraphQLList(UserType),
  args,
  resolve: async (parent, args, context, info) => {
    const users = await context.db
      .collection(Collections.USERS)
      .find()
      .toArray();
    const { page = -1, pageSize = -1 } = args;
    if (page <= 0 || pageSize <= 0) {
      return users;
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return slice(start, end, users);
  }
};
