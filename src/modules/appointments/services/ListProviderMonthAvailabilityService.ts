import User from '@modules/users/infra/typeorm/entities/User';

import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  avaliable: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
    constructor(
      @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}
    

    public async execute({ provider_id, year, month }: IRequest): Promise<IResponse> {
      const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
        provider_id,
        year,
        month
      });

      console.log(appointments)

      return [
        { day: 1, avaliable: false }
      ];
    }
}
