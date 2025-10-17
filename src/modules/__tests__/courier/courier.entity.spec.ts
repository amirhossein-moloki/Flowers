import { Courier, CourierCreationError } from '@/modules/courier/domain/courier.entity';

describe('Courier Entity', () => {
  const validProps = {
    name: 'John Doe',
    phone: '123-456-7890',
    email: 'john.doe@example.com',
  };

  it('should create a courier successfully with valid props', () => {
    const result = Courier.create(validProps);
    expect(result.success).toBe(true);
    if (result.success) {
      const courier = result.value;
      expect(courier).toBeInstanceOf(Courier);
      expect(courier.name).toBe(validProps.name);
    }
  });

  it('should fail to create a courier if name is missing', () => {
    const props = { ...validProps, name: '' };
    const result = Courier.create(props);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(CourierCreationError);
      expect(result.error.message).toBe('Courier name, phone, and email cannot be empty.');
    }
  });

  it('should fail to create a courier with an invalid email', () => {
    const props = { ...validProps, email: 'invalid-email' };
    const result = Courier.create(props);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(CourierCreationError);
      expect(result.error.message).toBe('Invalid email format.');
    }
  });

  it('should assign an id if one is provided', () => {
    const id = 'custom-courier-id';
    const result = Courier.create(validProps, id);
    if (result.success) {
      const courier = result.value;
      expect(courier.id).toBe(id);
    }
  });

  it('should default isAvailable to true if not provided', () => {
    const result = Courier.create(validProps);
    if (result.success) {
      expect(result.value.isAvailable).toBe(true);
    }
  });
});