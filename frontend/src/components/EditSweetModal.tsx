import React, { useState } from 'react';
import { Sweet, sweetsAPI } from '../api/api';
import '../styles/Modal.css';

interface EditSweetModalProps {
  sweet: Sweet;
  onClose: () => void;
  onSuccess: () => void;
}

const EditSweetModal: React.FC<EditSweetModalProps> = ({ sweet, onClose, onSuccess }) => {
  console.log('EditSweetModal rendering with sweet:', sweet);
  const [name, setName] = useState(sweet.name);
  const [category, setCategory] = useState(sweet.category);
  const [price, setPrice] = useState(sweet.price.toString());
  const [quantity, setQuantity] = useState(sweet.quantity.toString());
  const [description, setDescription] = useState(sweet.description || '');
  const [imageUrl, setImageUrl] = useState(sweet.imageUrl || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted, updating sweet:', sweet.id);
    setError('');
    setLoading(true);

    try {
      const updateData = {
        name,
        category,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        description: description || undefined,
        imageUrl: imageUrl || undefined,
      };
      console.log('Sending update with data:', updateData);
      const response = await sweetsAPI.update(sweet.id, updateData);
      console.log('Update successful:', response.data);
      onSuccess();
    } catch (err: any) {
      console.error('Update failed:', err);
      setError(err.response?.data?.error || 'Failed to update sweet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Sweet</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              step="0.01"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL (Optional)</label>
            <input
              type="url"
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Updating...' : 'Update Sweet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSweetModal;
