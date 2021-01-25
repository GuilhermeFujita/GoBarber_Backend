import { container } from 'tsyringe';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  ethereal: EtherealMailProvider,
};
container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(providers.ethereal),
);
