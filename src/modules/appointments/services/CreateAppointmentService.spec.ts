import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('Create Appointment', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    );
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123123',
      provider_id: '1231234'
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1231234')
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 12);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '1231234'
    });

    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '1231234'
    })).rejects.toBeInstanceOf(AppError)

  });

  it('should not be able to create an appointment on a past date', async() => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date:  new Date(2020, 4, 10, 11),
      user_id: '123123',
      provider_id: '1231234'
    })).rejects.toBeInstanceOf(AppError)

  });

  it('should not be able to create an appointment with same user as provider', async() => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date:  new Date(2020, 4, 10, 13),
      user_id: '123123',
      provider_id: '123123'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment before 8am and after 5pm', async() => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date:  new Date(2020, 4, 10, 7),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(AppError)

    await expect(createAppointment.execute({
      date:  new Date(2020, 4, 10, 18),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(AppError)
  });
})