import { DeliveryWindow as DeliveryWindowEntity } from '../../domain/delivery-window.entity';
import { DeliveryWindow as DeliveryWindowModel } from '@prisma/client';

export class DeliveryWindowMapper {
  static toDomain(persistence: DeliveryWindowModel): DeliveryWindowEntity {
    const { id, ...props } = persistence;
    const result = DeliveryWindowEntity.create(
      {
        label: props.label,
        start_time: props.start_time,
        end_time: props.end_time,
        cutoff_time: props.cutoff_time,
        zone_id: props.zone_id,
        is_active: props.is_active,
      },
      id,
    );

    if (result.isFailure()) {
      throw new Error(result.error.message);
    }

    return result.value;
  }

  static toPersistence(domain: DeliveryWindowEntity) {
    return {
      id: domain.id,
      label: domain.label,
      start_time: domain.start_time,
      end_time: domain.end_time,
      cutoff_time: domain.cutoff_time,
      zone_id: domain.zone_id,
      is_active: domain.is_active,
    };
  }
}
