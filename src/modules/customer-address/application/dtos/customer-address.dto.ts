import { AddressDto } from "@/modules/address/application/dtos/address.dto";

export interface CustomerAddressDto {
    id: string;
    user_id: string;
    address_id: string;
    is_default: boolean;
    label: string;
    address?: AddressDto;
}
