import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notificatiion from '@modules/notifications/infra/typeorm/schemas/Notification';

export default class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notificatiion>;

  constructor() {
    this.ormRepository = getMongoRepository(Notificatiion, 'mongo');
  }

  public async create({
    content,
    recipient_id
  }: ICreateNotificationDTO): Promise<Notificatiion> {
    const notification = this.ormRepository.create({
      content,
      recipient_id
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}
