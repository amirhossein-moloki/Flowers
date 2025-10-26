import { Entity } from '../../../core/domain/entity';
import { Result, success } from '../../../core/utils/result';

interface ServiceZoneProps {
  name: string;
  geo_json: any;
  is_active?: boolean;
}

export class ServiceZone extends Entity<ServiceZoneProps> {
  private constructor(props: ServiceZoneProps, id?: string) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get geo_json(): any {
    return this.props.geo_json;
  }

  get is_active(): boolean {
    return this.props.is_active ?? false;
  }

  public static create(
    props: ServiceZoneProps,
    id?: string,
  ): Result<ServiceZone, Error> {
    const serviceZone = new ServiceZone(
      {
        ...props,
        is_active: props.is_active ?? true,
      },
      id,
    );
    return success(serviceZone);
  }
}