import { of } from 'rxjs'
import { shareReplay } from 'rxjs/operators'
import Env from './env.json'

export default of(Env).pipe(shareReplay(1))
