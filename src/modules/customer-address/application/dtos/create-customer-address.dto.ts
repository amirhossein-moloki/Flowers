export interface CreateCustomerAddressDto {
    user_id: string;
    address_id: string;
    is_default?: boolean;
    label: string;
}
