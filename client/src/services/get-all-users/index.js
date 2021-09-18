import getOr from 'lodash/fp/getOr'
import _map from 'lodash/fp/map'
import { ajax } from 'rxjs/ajax'
import { map, switchMap } from 'rxjs/operators'
import getOptions from '../utils/get-options'
import App$ from '../env'

const query = `query GetAllUsers($page: Int, $pageSize: Int){
  getAllUsers(page: $page, pageSize: $pageSize){
  	users {
  	  _id
  	  firstname
  	  lastname
  	  email
  	}
    rowsCount
  }
}
`

const parseResponse = ({ response }) => {
    const { users = [], rowsCount = 0 } = getOr({}, 'data.getAllUsers', response)
    return {
        rowsCount,
        users: _map(({ _id: id, ...rest }) => ({ ...rest, id }), users),
    }
}

const getAllUsers = (page = 1, pageSize = 10) =>
    App$.pipe(
        switchMap(({ api }) =>
            ajax(
                getOptions({
                    body: JSON.stringify({ query, variables: { page, pageSize } }),
                    url: api.graphql,
                })
            )
        ),
        map(parseResponse)
    )

export default getAllUsers
