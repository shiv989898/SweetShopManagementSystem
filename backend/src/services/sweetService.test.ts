import { SweetService } from '../services/sweetService';
import { Sweet } from '../models/Sweet';

jest.mock('../models/Sweet');

describe('SweetService', () => {
  let sweetService: SweetService;

  beforeEach(() => {
    sweetService = new SweetService();
    jest.clearAllMocks();
  });

  describe('createSweet', () => {
    it('should create a new sweet', async () => {
      const mockSweet = {
        _id: 'mockId123',
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.50,
        quantity: 100,
        description: 'Delicious chocolate',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (Sweet.create as jest.Mock).mockResolvedValue(mockSweet);

      const result = await sweetService.createSweet('Chocolate Bar', 'Chocolate', 2.50, 100, 'Delicious chocolate');

      expect(Sweet.create).toHaveBeenCalledWith({
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.50,
        quantity: 100,
        description: 'Delicious chocolate'
      });
      expect(result).toEqual(mockSweet);
    });
  });

  describe('getAllSweets', () => {
    it('should return all sweets', async () => {
      const mockSweets = [
        { _id: '1', name: 'Chocolate Bar', category: 'Chocolate', price: 2.50, quantity: 100 },
        { _id: '2', name: 'Gummy Bears', category: 'Gummy', price: 1.99, quantity: 50 }
      ];

      const mockFind = {
        sort: jest.fn().mockResolvedValue(mockSweets)
      };
      (Sweet.find as jest.Mock).mockReturnValue(mockFind);

      const result = await sweetService.getAllSweets();

      expect(Sweet.find).toHaveBeenCalled();
      expect(mockFind.sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(result).toEqual(mockSweets);
    });
  });

  describe('getSweetById', () => {
    it('should return sweet by id', async () => {
      const mockSweet = { _id: '1', name: 'Chocolate Bar', price: 2.50 };
      (Sweet.findById as jest.Mock).mockResolvedValue(mockSweet);

      const result = await sweetService.getSweetById('1');

      expect(Sweet.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockSweet);
    });

    it('should return null for non-existent sweet', async () => {
      (Sweet.findById as jest.Mock).mockResolvedValue(null);

      const result = await sweetService.getSweetById('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('searchSweets', () => {
    it('should search sweets by name', async () => {
      const mockSweets = [{ _id: '1', name: 'Chocolate Bar' }];
      const mockFind = {
        sort: jest.fn().mockResolvedValue(mockSweets)
      };
      (Sweet.find as jest.Mock).mockReturnValue(mockFind);

      await sweetService.searchSweets('Chocolate');

      expect(Sweet.find).toHaveBeenCalledWith({
        name: { $regex: 'Chocolate', $options: 'i' }
      });
    });

    it('should filter by price range', async () => {
      const mockFind = {
        sort: jest.fn().mockResolvedValue([])
      };
      (Sweet.find as jest.Mock).mockReturnValue(mockFind);

      await sweetService.searchSweets(undefined, undefined, 1.00, 5.00);

      expect(Sweet.find).toHaveBeenCalledWith({
        price: { $gte: 1.00, $lte: 5.00 }
      });
    });
  });

  describe('updateSweet', () => {
    it('should update sweet details', async () => {
      const mockSweet = { _id: '1', name: 'Updated Chocolate', price: 3.00 };
      (Sweet.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockSweet);

      const result = await sweetService.updateSweet('1', { name: 'Updated Chocolate', price: 3.00 });

      expect(Sweet.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { $set: { name: 'Updated Chocolate', price: 3.00 } },
        { new: true, runValidators: true }
      );
      expect(result).toEqual(mockSweet);
    });
  });

  describe('deleteSweet', () => {
    it('should delete sweet and return true', async () => {
      (Sweet.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: '1' });

      const result = await sweetService.deleteSweet('1');

      expect(result).toBe(true);
    });

    it('should return false for non-existent sweet', async () => {
      (Sweet.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const result = await sweetService.deleteSweet('nonexistent');

      expect(result).toBe(false);
    });
  });

  describe('purchaseSweet', () => {
    it('should decrease quantity on purchase', async () => {
      const mockSweet = {
        _id: '1',
        quantity: 10,
        save: jest.fn().mockResolvedValue({ _id: '1', quantity: 9 })
      };

      (Sweet.findById as jest.Mock).mockResolvedValue(mockSweet);

      await sweetService.purchaseSweet('1', 1);

      expect(mockSweet.quantity).toBe(9);
      expect(mockSweet.save).toHaveBeenCalled();
    });

    it('should throw error for insufficient quantity', async () => {
      const mockSweet = {
        _id: '1',
        quantity: 1,
        save: jest.fn()
      };

      (Sweet.findById as jest.Mock).mockResolvedValue(mockSweet);

      await expect(sweetService.purchaseSweet('1', 5)).rejects.toThrow('Insufficient quantity in stock');
      expect(mockSweet.save).not.toHaveBeenCalled();
    });
  });

  describe('restockSweet', () => {
    it('should increase quantity on restock', async () => {
      const mockSweet = {
        _id: '1',
        quantity: 100,
        save: jest.fn().mockResolvedValue({ _id: '1', quantity: 110 })
      };

      (Sweet.findById as jest.Mock).mockResolvedValue(mockSweet);

      const result = await sweetService.restockSweet('1', 10);

      expect(mockSweet.quantity).toBe(110);
      expect(mockSweet.save).toHaveBeenCalled();
      expect(result?.quantity).toBe(110);
    });
  });
});
