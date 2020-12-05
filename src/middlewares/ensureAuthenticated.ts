import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
    iat: number; //data da criação da sessão
    exp: number; //data de expiração
    sub: string; //id do usuário
}

// Validação do Token JWT
export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT Token is missing');
    }

    const [type, token] = authHeader.split(' '); //type = Bearer, mas não vai ser utilizado

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        request.user.id = sub;

        return next();
    } catch {
        throw new Error('Invalid JWT Token');
    }
    
}