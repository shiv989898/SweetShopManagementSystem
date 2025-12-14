import { Router, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';
import { SweetService } from '../services/sweetService';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();
const sweetService = new SweetService();

// POST /api/sweets - Create a new sweet (Protected, Admin only)
router.post('/',
  authenticateToken,
  requireAdmin,
  body('name').notEmpty().withMessage('Name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, category, price, quantity, description } = req.body;
      const sweet = await sweetService.createSweet(name, category, price, quantity, description);
      res.status(201).json(sweet);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create sweet' });
    }
  }
);

// GET /api/sweets - Get all sweets (Protected)
router.get('/',
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const sweets = await sweetService.getAllSweets();
      res.json(sweets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sweets' });
    }
  }
);

// GET /api/sweets/search - Search sweets (Protected)
router.get('/search',
  authenticateToken,
  query('minPrice').optional().isFloat({ min: 0 }),
  query('maxPrice').optional().isFloat({ min: 0 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, category, minPrice, maxPrice } = req.query;
      const sweets = await sweetService.searchSweets(
        name as string,
        category as string,
        minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice ? parseFloat(maxPrice as string) : undefined
      );
      res.json(sweets);
    } catch (error) {
      res.status(500).json({ error: 'Search failed' });
    }
  }
);

// PUT /api/sweets/:id - Update sweet (Protected)
router.put('/:id',
  authenticateToken,
  body('price').optional().isFloat({ min: 0 }),
  body('quantity').optional().isInt({ min: 0 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const id = req.params.id;
      const updates = req.body;
      const sweet = await sweetService.updateSweet(id, updates);
      
      if (!sweet) {
        return res.status(404).json({ error: 'Sweet not found' });
      }
      
      res.json(sweet);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update sweet' });
    }
  }
);

// DELETE /api/sweets/:id - Delete sweet (Protected, Admin only)
router.delete('/:id',
  authenticateToken,
  requireAdmin,
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const deleted = await sweetService.deleteSweet(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Sweet not found' });
      }
      
      res.json({ message: 'Sweet deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete sweet' });
    }
  }
);

// POST /api/sweets/:id/purchase - Purchase sweet (Protected)
router.post('/:id/purchase',
  authenticateToken,
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const id = req.params.id;
      const quantity = req.body.quantity || 1;
      const sweet = await sweetService.purchaseSweet(id, quantity);
      res.json(sweet);
    } catch (error: any) {
      if (error.message === 'Sweet not found') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Insufficient quantity in stock') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Purchase failed' });
    }
  }
);

// POST /api/sweets/:id/restock - Restock sweet (Protected, Admin only)
router.post('/:id/restock',
  authenticateToken,
  requireAdmin,
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const id = req.params.id;
      const { quantity } = req.body;
      const sweet = await sweetService.restockSweet(id, quantity);
      
      if (!sweet) {
        return res.status(404).json({ error: 'Sweet not found' });
      }
      
      res.json(sweet);
    } catch (error) {
      res.status(500).json({ error: 'Restock failed' });
    }
  }
);

export default router;
