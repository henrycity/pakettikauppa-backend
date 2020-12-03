import { Request, Response, NextFunction } from 'express'

export function tokenVerifier(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { jwt } = req.cookies
  // If web and token in cookie
  if (jwt) next()
  else {
    const authHeader = req.header('Authorization')
    // If mobile and token in authorization header
    if (authHeader) {
      const bearerToken = authHeader.split(' ')[1]
      if (bearerToken) next()
    } else {
      res.sendStatus(403)
    }
  }
}
