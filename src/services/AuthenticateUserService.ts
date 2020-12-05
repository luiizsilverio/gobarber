import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new Error('E-mail ou senha incorretos.');
        }

        // compara uma senha normal com outra criptografada 
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('E-mail ou senha incorretos.');
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret /* frase secreta */, {
            subject: user.id,
            expiresIn: expiresIn, // '1d', //expira em 24 horas
        });
                
        return { user, token };
    }
}

export default AuthenticateUserService;
