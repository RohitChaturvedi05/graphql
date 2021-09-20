import { ObjectId } from 'bson';
import { GraphQLString } from 'graphql/type';
import ResponseType from '../types/response';
import Collections from '../../db/constants/collections';

const args = {
    id: {
        type: GraphQLString,
    },
    firstname: {
        type: GraphQLString,
    },
    lastname: {
        type: GraphQLString,
    },
    email: {
        type: GraphQLString,
    },
};

export default {
    type: ResponseType,
    args,
    resolve: async (parent, args, context) => {
        const { id, firstname, lastname, email } = args;
        const query = { _id: ObjectId(id) };

        const update = {
            $set: {
                ...(firstname && { firstname }),
                ...(lastname && { lastname }),
                ...(email && { email }),
            },
        };
        const options = { upsert: true };

        const { modifiedCount: count, upsertedId } = await context.db
            .collection(Collections.USERS)
            .updateOne(query, update, options);

        const message = upsertedId
            ? `User not found. Added a new User with id: ${upsertedId}`
            : 'Successfully updated user';

        return { count, id, message };
    },
};
