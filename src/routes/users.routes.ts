import { request, Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

// A rota POST não exige que o usuário esteja logado, por isso não chamamos
// o middleware ensureAuthenticated com use(), como foi feito em appointments.routes. 
// O middleware só é chamado na rota PATCH.

usersRouter.post('/', async (req, resp) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password; // não mostrar password no json

    return resp.json(user);

  } catch (err) {
    //return resp.status(400).json({ error: err.message })
    return resp.status(err.statusCode).json({ error: err.message })
  }
});

// Por convenção, o método PATCH é utilizado quando queremos atualizar 
// alguma informação específica da tabela, por exemplo alteração de senha,
// ou, nesse caso, alterar o avatar. Diferente do PUT, que altera todos os
// campos do usuário.
// Aqui, passamos 2 middlewares no método PATH: ensureAuthenticated, para ver
// se o usuário está logado, e upload.single(), que permite fazer upload de 
// um único arquivo.

usersRouter.patch('/avatar', 
  ensureAuthenticated, 
  upload.single('avatar'),
  async (req, resp) => {
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();
      
      const user = await updateUserAvatarService.execute({
        user_id: req.user.id,
        fileName: req.file.filename,
      });
  
      delete user.password;
      return resp.json(user)

    } catch (err) {
      //return resp.status(400).json({ error: err.message })
      return resp.status(err.statusCode).json({ error: err.message })
    }
  }
);

export default usersRouter;
