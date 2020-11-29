import { Router } from 'express';
import appointmentsRoutes from './appointments.routes'

const routes = Router();

routes.use('/appointments', appointmentsRoutes);


/*
routes.post('/users', (req, resp) => {
  console.log(req.body)
  const { name, email } = req.body;
  const user = { name, email, };
  return resp.json(user);  //resp.send(name)
});
*/

export default routes;
