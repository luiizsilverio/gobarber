import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

// POST http://localhost:3333/users

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
    return resp.status(400).json({ error: err.message })
  }
});

export default usersRouter;
