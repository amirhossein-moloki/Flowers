import { randomUUID } from 'crypto';

export abstract class Entity<T> {
  public readonly id: string;
  public readonly props: T;

  constructor(props: T, id?: string) {
    this.id = id ?? randomUUID();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return this.id === object.id;
  }
}