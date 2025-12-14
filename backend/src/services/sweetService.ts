import { Sweet as SweetModel } from '../models/Sweet';
import { Sweet } from '../types';

export class SweetService {
  async createSweet(name: string, category: string, price: number, quantity: number, description?: string, imageUrl?: string): Promise<any> {
    const sweet = await SweetModel.create({
      name,
      category,
      price,
      quantity,
      description,
      imageUrl,
    });
    const plainSweet = sweet.toObject();
    return {
      ...plainSweet,
      id: sweet._id.toString(),
      _id: undefined
    };
  }

  async getAllSweets(): Promise<any[]> {
    const sweets = await SweetModel.find().sort({ createdAt: -1 }).lean();
    return sweets.map(sweet => ({
      ...sweet,
      id: sweet._id.toString(),
      _id: undefined
    }));
  }

  async getSweetById(id: string): Promise<any | null> {
    const sweet = await SweetModel.findById(id).lean();
    if (!sweet) return null;
    return {
      ...sweet,
      id: sweet._id.toString(),
      _id: undefined
    };
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

    const sweets = await SweetModel.find(query).sort({ createdAt: -1 }).lean();
    return sweets.map(sweet => ({
      ...sweet,
      id: sweet._id.toString(),
      _id: undefined
    }));
  }

  async updateSweet(id: string, updates: Partial<Sweet>): Promise<any | null> {
    const sweet = await SweetModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();
    if (!sweet) return null;
    return {
      ...sweet,
      id: sweet._id.toString(),
      _id: undefined
    };
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

    const plainSweet = sweet.toObject();
    return {
      ...plainSweet,
      id: sweet._id.toString(),
      _id: undefined
    };
  }

  async restockSweet(id: string, quantity: number): Promise<any | null> {
    const sweet = await SweetModel.findById(id);

    if (!sweet) {
      return null;
    }

    sweet.quantity += quantity;
    await sweet.save();

    const plainSweet = sweet.toObject();
    return {
      ...plainSweet,
      id: sweet._id.toString(),
      _id: undefined
    };
  }
}
