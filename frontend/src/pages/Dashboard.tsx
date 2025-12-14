import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sweet, sweetsAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SweetCard from '../components/SweetCard';
import AddSweetModal from '../components/AddSweetModal';
import EditSweetModal from '../components/EditSweetModal';
import Cart from '../components/Cart';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);
  const { user, logout, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const fetchSweets = async () => {
    try {
      const response = await sweetsAPI.getAll();
      setSweets(response.data);
      setFilteredSweets(response.data);
    } catch (error) {
      console.error('Failed to fetch sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  useEffect(() => {
    let filtered = sweets;

    if (searchTerm) {
      filtered = filtered.filter(sweet =>
        sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(sweet => sweet.category === categoryFilter);
    }

    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        filtered = filtered.filter(sweet => sweet.price >= min);
      }
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        filtered = filtered.filter(sweet => sweet.price <= max);
      }
    }

    setFilteredSweets(filtered);
  }, [searchTerm, categoryFilter, minPrice, maxPrice, sweets]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      try {
        await sweetsAPI.delete(id);
        fetchSweets();
      } catch (error: any) {
        alert(error.response?.data?.error || 'Delete failed');
      }
    }
  };

  const handleRestock = async (id: number, quantity: number) => {
    try {
      await sweetsAPI.restock(id, quantity);
      fetchSweets();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Restock failed');
    }
  };

  const handleEdit = (sweet: Sweet) => {
    console.log('handleEdit called with:', sweet);
    console.log('Setting selectedSweet and showEditModal to true');
    setSelectedSweet(sweet);
    setShowEditModal(true);
  };

  const categories = Array.from(new Set(sweets.map(sweet => sweet.category)));

  if (loading) {
    return <div className="loading">Loading sweets...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🍬 Sweet Shop Dashboard</h1>
          <div className="user-info">
            {!isAdmin && (
              <button onClick={() => setShowCart(true)} className="btn-cart">
                🛒 Cart ({getTotalItems()})
              </button>
            )}
            <span>{user?.email} {isAdmin && <span className="admin-badge">Admin</span>}</span>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="controls">
          <input
            type="text"
            placeholder="Search sweets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="price-filter"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="price-filter"
          />
          {isAdmin && (
            <button onClick={() => setShowAddModal(true)} className="btn-primary">
              Add New Sweet
            </button>
          )}
        </div>

        <div className="sweets-grid">
          {filteredSweets.length === 0 ? (
            <p className="no-results">No sweets found</p>
          ) : (
            filteredSweets.map(sweet => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                isAdmin={isAdmin}
                onDelete={handleDelete}
                onRestock={handleRestock}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>

      {showAddModal && (
        <AddSweetModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchSweets();
          }}
        />
      )}

      {showEditModal && selectedSweet && (
        <EditSweetModal
          sweet={selectedSweet}
          onClose={() => {
            setShowEditModal(false);
            setSelectedSweet(null);
          }}
          onSuccess={() => {
            setShowEditModal(false);
            setSelectedSweet(null);
            fetchSweets();
          }}
        />
      )}

      {showCart && (
        <Cart
          onClose={() => setShowCart(false)}
          onCheckoutSuccess={() => {
            setShowCart(false);
            fetchSweets();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
