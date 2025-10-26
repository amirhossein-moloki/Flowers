import { IVendorOutletRepository } from '../../../../vendor-outlet/domain/vendor-outlet.repository';
import { VendorOutlet } from '../../../../vendor-outlet/domain/vendor-outlet.entity';

export class MockVendorOutletRepository implements IVendorOutletRepository {
  private outlets: VendorOutlet[] = [];

  async findById(id: string): Promise<VendorOutlet | null> {
    return this.outlets.find((outlet) => outlet.id === id) || null;
  }

  async findByVendorId(vendorId: string): Promise<VendorOutlet[]> {
    return this.outlets.filter((outlet) => outlet.vendorId === vendorId);
  }

  async findAll(): Promise<VendorOutlet[]> {
    return this.outlets;
  }

  async save(vendorOutlet: VendorOutlet): Promise<VendorOutlet> {
    const existingIndex = this.outlets.findIndex(
      (outlet) => outlet.id === vendorOutlet.id,
    );
    if (existingIndex > -1) {
      this.outlets[existingIndex] = vendorOutlet;
    } else {
      this.outlets.push(vendorOutlet);
    }
    return vendorOutlet;
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.outlets.length;
    this.outlets = this.outlets.filter((outlet) => outlet.id !== id);
    return this.outlets.length < initialLength;
  }
}
