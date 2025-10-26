import { IVendorRepository } from '../../../../vendor/domain/vendor.repository';
import { Vendor } from '../../../../vendor/domain/vendor.entity';

export class MockVendorRepository implements IVendorRepository {
  private vendors: Vendor[] = [];

  async findById(id: string): Promise<Vendor | null> {
    return this.vendors.find((vendor) => vendor.id === id) || null;
  }

  async findByEmail(email: string): Promise<Vendor | null> {
    return this.vendors.find((vendor) => vendor.email === email) || null;
  }

  async findByPhone(phone: string): Promise<Vendor | null> {
    return this.vendors.find((vendor) => vendor.phone === phone) || null;
  }

  async findAll(): Promise<Vendor[]> {
    return this.vendors;
  }

  async save(vendor: Vendor): Promise<Vendor> {
    this.vendors.push(vendor);
    return vendor;
  }

  async update(vendor: Vendor): Promise<Vendor> {
    const index = this.vendors.findIndex((v) => v.id === vendor.id);
    this.vendors[index] = vendor;
    return vendor;
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.vendors.length;
    this.vendors = this.vendors.filter((vendor) => vendor.id !== id);
    return this.vendors.length < initialLength;
  }
}
