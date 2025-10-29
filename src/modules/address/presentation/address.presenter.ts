import { AddressDto } from '../application/dtos/address.dto';

export class AddressPresenter {
    static toJSON(address: AddressDto) {
        return {
            id: address.id,
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            country: address.country,
            isResidential: address.isResidential,
        };
    }
}
