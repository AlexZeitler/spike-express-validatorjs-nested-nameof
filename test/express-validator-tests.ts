import 'should'

import express from 'express'
import { body, validationResult } from 'express-validator'
import { createRequest, createResponse } from 'node-mocks-http'
import { nameof } from 'ts-simple-nameof'

import { MyCommand } from '../src/types'

const testExpressValidatorMiddleware = async (
  req: express.Request,
  res: express.Response,
  middlewares: ((
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => Promise<void> | void)[]
) => {
  await Promise.all(
    middlewares.map(async (middleware) => {
      await middleware(req, res, () => undefined)
    })
  )
}

describe('express-validator', (): void => {
  it('should not validate non-existing nested properties', async () => {
    const req = createRequest({
      body: { test: 'exists', some: { nested: {} } }
    })
    await testExpressValidatorMiddleware(req, createResponse(), [
      body(nameof<MyCommand>((c) => c.some.nested.property)).exists()
    ])
    const result = validationResult(req)
    result.array().length.should.equal(1)
  })

  it('should validate existing nested properties', async () => {
    const req = createRequest({
      body: { test: 'exists', some: { nested: { property: 'exists' } } }
    })
    await testExpressValidatorMiddleware(req, createResponse(), [
      body(nameof<MyCommand>((c) => c.some.nested.property)).exists()
    ])
    const result = validationResult(req)
    result.array().length.should.equal(0)
  })
})
