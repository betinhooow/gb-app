import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/notification';
import { ObjectId } from 'mongodb';
import INotificationsRepository from '../INotificationsRepository';

class MockNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      content,
      recipient_id,
      id: new ObjectId(),
    });

    this.notifications.push(notification);

    return notification;
  }
}
export default MockNotificationsRepository;
