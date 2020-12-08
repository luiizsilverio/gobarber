import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  //console.log(request.user);
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
})

// POST http://localhost:3333/appointments

appointmentsRouter.post('/', async (req, resp) => {
  try {
    const { provider_id, date } = req.body;
    
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({ provider_id, date: parsedDate });
    
    return resp.json(appointment);

  } catch (err) {
    //return resp.status(400).json({ error: err.message })
    return resp.status(err.statusCode).json({ error: err.message })
  }
});


export default appointmentsRouter;
