import { GenericLogMessage } from './genericMessages';

type Variant = 'info' | 'error';

const mappedLogs: Record<Variant, Function> = {
  error: (message: string): void => console.error(message),
  info: (message: string): void => console.info(`%c ${message}`, 'color: #3792cb'),
};

export const log = (
  message: GenericLogMessage | string,
  variant: Variant = 'error',
): void => mappedLogs[variant](message);
