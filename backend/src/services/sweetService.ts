import { Sweet as SweetModel } from '../models/Sweet';
import { Sweet } from '../types';

export class SweetService {
  async createSweet(name: string, category: string, price: number, quantity: number, description?: string): Promise<any> {
    const sweet = await SweetModel.create({
      name,
      category,
      price,
      quantity,
      description,
    });
    return sweet;
  }

  async getAllSweets(): Promise<any[]> {
    const sweets = await SweetModel.find().sort({ createdAt: -1 });
    return sweets;
  }

  async getSweetById(id: string): Promise<any | null> {
    const sweet = await SweetModel.findById(id);
    return sweet;
  }

  async searchSweets(searchTerm?: string, category?: string, minPrice?: number, maxPrice?: number): Promise<any[]> {
    const query: any = {};

    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) {
        query.price.$gte = minPrice;
      }
      if (maxPrice !== undefined) {
        query.price.$lte = maxPrice;
      }
    }

    const sweets = await SweetModel.find(query).sort({ createdAt: -1 });
    return sweets;
  }

  async updateSweet(id: string, updates: Partial<Sweet>): Promise<any | null> {
    const sweet = await SweetModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    return sweet;
  }

  async deleteSweet(id: string): Promise<boolean> {
    const result = await SweetModel.findByIdAndDelete(id);
    return result !== null;
  }

  async purchaseSweet(id: string, quantity: number = 1): Promise<any | null> {
    const sweet = await SweetModel.findById(id);

    if (!sweet) {
      throw new Error('Sweet not found');
    }

    if (sweet.quantity < quantity) {
      throw new Error('Insufficient quantity in stock');
    }

    sweet.quantity -= quantity;
    await sweet.save();

    return sweet;
  }

  async restockSweet(id: string, quantity: number): Promise<any | null> {
    const sweet = await SweetModel.findById(id);

    if (!sweet) {
      return null;
    }

    sweet.quantity += quantity;
    await sweet.save();

    return sweet;
  }
}
