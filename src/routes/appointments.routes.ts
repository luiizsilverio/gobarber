import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository;

// SoC: Separation of Concerns (separação de procupações)
// DTO: Data Transfer Object
// Rota: receber a requisição, chamar outro arquivo para tratar
// a requisição e devolver uma resposta para o cliente.

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
})

// POST http://localhost:3333/appointments

appointmentsRouter.post('/', (req, resp) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = createAppointment.execute({ provider, date: parsedDate });
    return resp.json(appointment);
  } catch (err) {
    return resp.status(400).json({ error: err.message })
  }
});


export default appointmentsRouter;
