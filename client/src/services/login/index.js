import { ajax } from 'rxjs/ajax'
import { pluck, tap } from 'rxjs/operators'
import getOptions from '../utils/get-options'
import Env from '../../constants/env'

export default (username, password) => ajax(
    getOptions({
        body: {
            username,
            password,
        },
        url: Env.api.login,
    })
).pipe(
    pluck('response'),
    tap(x => console.log('login-token', x))
)
