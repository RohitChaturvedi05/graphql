import { ApolloClient, InMemoryCache } from '@apollo/client'
import once from 'lodash/fp/once'
import Env from '../../constants/env'

export default once(() => {
    const client = new ApolloClient({
        uri: Env.api.graphql,
        cache: new InMemoryCache(),
    })

    return client
})
