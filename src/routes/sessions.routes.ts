import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

// POST http://localhost:3333/sessions

sessionsRouter.post('/', async (req, resp) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();
    
    const { user, token } = await authenticateUser.execute({
        email,
        password
    });

    delete user.password;

    return resp.json({ user , token });

  } catch (err) {
    return resp.status(400).json({ error: err.message })
  }
});

export default sessionsRouter;
