export interface CreateAddressDto {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isResidential?: boolean;
}
