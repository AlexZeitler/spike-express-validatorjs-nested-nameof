import 'should'

import { nameof } from 'ts-simple-nameof'

import { MyCommand } from '../src/types'

describe('nameof', (): void => {
  it('should resolve type alias properties', (done) => {
    const x = nameof<MyCommand>((c) => c.some.nested.property)
    x.should.equal('some.nested.property')
    done()
  })
})
