import { Address, AddressCreationError } from '@/modules/address/domain/address.entity';

describe('Address Entity', () => {
  const validProps = {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
    country: 'USA',
  };

  it('should create an address successfully with valid props', () => {
    const result = Address.create(validProps);
    expect(result.success).toBe(true);
    if (result.success) {
      const address = result.value;
      expect(address).toBeInstanceOf(Address);
      expect(address.street).toBe(validProps.street);
    }
  });

  it('should fail to create an address if street is missing', () => {
    const props = { ...validProps, street: '' };
    const result = Address.create(props);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(AddressCreationError);
      expect(result.error.message).toBe('Address fields cannot be empty.');
    }
  });

  it('should assign an id if one is provided', () => {
    const id = 'custom-id-123';
    const result = Address.create(validProps, id);
    if (result.success) {
      const address = result.value;
      expect(address.id).toBe(id);
    }
  });

  it('should handle optional isResidential prop', () => {
    const propsWithResidential = { ...validProps, isResidential: true };
    const result = Address.create(propsWithResidential);
    if (result.success) {
      expect(result.value.isResidential).toBe(true);
    }

    const propsWithoutResidential = { ...validProps, isResidential: null };
    const result2 = Address.create(propsWithoutResidential);
    if (result2.success) {
      expect(result2.value.isResidential).toBeNull();
    }
  });
});