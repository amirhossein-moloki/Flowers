import { DomainEvent } from '../domain/domain-event';
import { IEventBus } from './event-bus';
import logger from '../utils/logger';

type Handler = (event: DomainEvent) => void;

export class InMemoryEventBus implements IEventBus {
  private readonly handlers: { [eventName: string]: Handler[] } = {};

  public subscribe(eventName: string, handler: Handler): void {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  }

  public async publish(event: DomainEvent): Promise<void> {
    const eventName = event.constructor.name;
    const handlers = this.handlers[eventName];

    if (handlers) {
      logger.info(`[EventBus] Publishing event: ${eventName}`);
      for (const handler of handlers) {
        try {
          await Promise.resolve(handler(event));
        } catch (error) {
          logger.error(`[EventBus] Error handling event ${eventName}:`, error);
        }
      }
    }
  }
}