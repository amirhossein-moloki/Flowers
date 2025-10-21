export interface AddressDto {
    id: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isResidential: boolean | null;
}
