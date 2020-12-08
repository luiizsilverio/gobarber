import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    user_id: string;
    fileName: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, fileName }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);
        
        if (!user) {
            //throw new Error('Usuário não autenticado.');
            throw new AppError('Usuário não autenticado.', 401);
        }

        if (user.avatar) {
            // deletar avatar anterior
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            
            //const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            const userAvatarFileExists = fs.existsSync(userAvatarFilePath);

            if (userAvatarFileExists) {
                //fs.promises.unlink(userAvatarFilePath);
                fs.unlinkSync(userAvatarFilePath);
            }
        }

        user.avatar = fileName;

        // o save pode ser usado para incluir ou alterar registro no banco
        await usersRepository.save(user);         
        return user;
    }
}

export default UpdateUserAvatarService;
