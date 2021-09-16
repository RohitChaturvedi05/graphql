import { BSONRegExp, ObjectId } from 'bson';
import { GraphQLList, GraphQLString } from 'graphql/type';
import UserType from '../types/user';
import Collections from '../../db/constants/collections';

const args = {
  id: {
    type: GraphQLString
  },
  text: {
    type: GraphQLString
  }
};

export default {
  type: new GraphQLList(UserType),
  args,
  resolve: async (parent, args, context) => {
    const { id = '', text = '' } = args;

    const user = await context.db
      .collection(Collections.USERS)
      .find({
        ...(text && {
          $or: [
            { firstname: { $regex: BSONRegExp(text, 'i') } },
            { lastname: { $regex: BSONRegExp(text, 'i') } },
            { email: { $regex: BSONRegExp(text, 'i') } }
          ]
        }),
        ...(id && {
          $and: [{ _id: ObjectId(id) }]
        })
      })
      .toArray();
    return user;
  }
};
