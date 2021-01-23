import { ObjectID } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notificatiion from '@modules/notifications/infra/typeorm/schemas/Notification';

export default class NotificationsRepository implements INotificationsRepository {
  private notifications: Notificatiion[] = [];

  public async create({
    content,
    recipient_id
  }: ICreateNotificationDTO): Promise<Notificatiion> {
    const notification = new Notificatiion();

    Object.assign(notification, {id: new ObjectID(), content, recipient_id })

    this.notifications.push(notification);

    return notification;
  }
}
