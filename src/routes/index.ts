import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

/*
routes.post('/users', (req, resp) => {
  console.log(req.body)
  const { name, email } = req.body;
  const user = { name, email, };
  return resp.json(user);  //resp.send(name)
});
*/

export default routes;
