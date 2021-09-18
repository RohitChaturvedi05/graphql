import { ApolloClient, InMemoryCache } from '@apollo/client'
import once from 'lodash/fp/once'
import Env from '../env/env.json'

export default once(() => {
    const client = new ApolloClient({
        uri: Env.api.graphql,
        cache: new InMemoryCache(),
    })
    return client
})
