import { ObjectId } from 'bson';
import { GraphQLString } from 'graphql/type';
import ResponseType from '../types/response';
import Collections from '../../db/constants/collections';

const args = {
  id: {
    type: GraphQLString
  }
};

export default {
  type: ResponseType,
  args,
  resolve: async (parent, args, context) => {
    const { id } = args;

    const { deletedCount: count } = await context.db
      .collection(Collections.USERS)
      .deleteOne({ _id: ObjectId(id) });

    const message =
      count === 0 ? 'Unable to find user' : 'User has been removed';

    return { count, id, message };
  }
};
