import React, { useState } from 'react';
import { Sweet } from '../api/api';
import '../styles/SweetCard.css';

interface SweetCardProps {
  sweet: Sweet;
  isAdmin: boolean;
  onPurchase: (id: number) => void;
  onDelete: (id: number) => void;
  onRestock: (id: number, quantity: number) => void;
  onEdit: (sweet: Sweet) => void;
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet, isAdmin, onPurchase, onDelete, onRestock, onEdit }) => {
  const [showRestock, setShowRestock] = useState(false);
  const [restockQuantity, setRestockQuantity] = useState(10);

  const handleRestock = () => {
    onRestock(sweet.id, restockQuantity);
    setShowRestock(false);
    setRestockQuantity(10);
  };

  return (
    <div className="sweet-card">
      <div className="sweet-header">
        <h3>{sweet.name}</h3>
        <span className="category-badge">{sweet.category}</span>
      </div>
      
      {sweet.description && (
        <p className="sweet-description">{sweet.description}</p>
      )}
      
      <div className="sweet-info">
        <div className="price">${sweet.price.toFixed(2)}</div>
        <div className={`quantity ${sweet.quantity === 0 ? 'out-of-stock' : ''}`}>
          Stock: {sweet.quantity}
        </div>
      </div>

      <div className="sweet-actions">
        <button
          onClick={() => onPurchase(sweet.id)}
          disabled={sweet.quantity === 0}
          className="btn-purchase"
        >
          {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
        </button>
        
        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(sweet)}
              className="btn-edit"
            >
              Edit
            </button>
            <button
              onClick={() => setShowRestock(!showRestock)}
              className="btn-restock"
            >
              Restock
            </button>
            <button
              onClick={() => onDelete(sweet.id)}
              className="btn-delete"
            >
              Delete
            </button>
          </>
        )}
      </div>

      {showRestock && isAdmin && (
        <div className="restock-panel">
          <input
            type="number"
            min="1"
            value={restockQuantity}
            onChange={(e) => setRestockQuantity(parseInt(e.target.value))}
            className="restock-input"
          />
          <button onClick={handleRestock} className="btn-confirm">
            Confirm Restock
          </button>
        </div>
      )}
    </div>
  );
};

export default SweetCard;
