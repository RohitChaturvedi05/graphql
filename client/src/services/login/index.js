import { ajax } from 'rxjs/ajax'
import { pluck, tap, shareReplay } from 'rxjs/operators'
import getOptions from '../utils/get-options'
import Env from '../../constants/env'

export default ajax(
    getOptions({
        body: {
            username: 'rchaturvedi',
        },
        url: Env.api.login,
    })
).pipe(
    pluck('response'),
    tap(x => console.log('login-token', x)),
    shareReplay(1)
)
