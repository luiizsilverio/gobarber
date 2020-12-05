import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

// um serviço sempre deve ter um único método, chamado execute ou run.

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    
    const appointmentDate = startOfHour(date);

    const findAppointment = await appointmentsRepository
      .findByDate(appointmentDate);

    if (findAppointment) {
      throw Error('Este horário já tem agendamento')
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
