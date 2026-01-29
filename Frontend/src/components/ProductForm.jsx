import React, { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';

const INITIAL_STATE = {
  name: '',
  price: '',
  category: '',
  inStock: false,
};

const DEFAULT_CATEGORIES = ['Electronics', 'Furniture', 'Kitchen', 'Clothing', 'Books', 'Other'];

const ProductForm = ({ onSubmit, editingProduct, onCancelEdit, isSubmitting }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('customCategories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        inStock: editingProduct.inStock,
      });
    } else {
      setFormData(INITIAL_STATE);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'category' && value === '+ Add New Category') {
      setShowNewCategory(true);
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      // Find the index of "Other" category
      const otherIndex = categories.findIndex(cat => cat === 'Other');
      const updatedCategories = [...categories];
      
      // Insert before "Other" if it exists, otherwise add at the end
      if (otherIndex !== -1) {
        updatedCategories.splice(otherIndex, 0, newCategory.trim());
      } else {
        updatedCategories.push(newCategory.trim());
      }
      
      setCategories(updatedCategories);
      localStorage.setItem('customCategories', JSON.stringify(updatedCategories));
      setFormData((prev) => ({ ...prev, category: newCategory.trim() }));
      setNewCategory('');
      setShowNewCategory(false);
    }
  };

  const handleCancelNewCategory = () => {
    setShowNewCategory(false);
    setNewCategory('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingProduct) {
      setFormData(INITIAL_STATE);
    }
  };

  return (
    <div className="bg-surface p-4 sm:p-6 rounded-xl border border-border-dark h-fit">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h2>
        {editingProduct && (
          <button
            onClick={onCancelEdit}
            className="text-xs sm:text-sm text-text-secondary hover:text-border-error flex items-center gap-1 transition-colors"
          >
            <X size={16} /> Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-text-primary mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g. Wireless Headphones"
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-background border border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-text-primary placeholder-text-secondary"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-text-primary mb-1">Price (£)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-background border border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-text-primary placeholder-text-secondary"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-text-primary mb-1">Category</label>
            {showNewCategory ? (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                  placeholder="Enter new category"
                  autoFocus
                  className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-background border border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-text-primary placeholder-text-secondary"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="flex-1 sm:flex-none px-4 sm:px-3 py-2 bg-primary hover:bg-secondary text-background rounded-lg transition-colors text-sm font-medium"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelNewCategory}
                    className="flex-1 sm:flex-none px-4 sm:px-3 py-2 bg-background hover:bg-surface text-text-primary border border-border-dark rounded-lg transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-background border border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-text-primary"
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="+ Add New Category" className="text-primary font-medium">+ Add New Category</option>
              </select>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 py-2">
          <input
            type="checkbox"
            id="inStock"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
            className="w-4 h-4 text-primary border-border-dark rounded focus:ring-primary cursor-pointer bg-background"
          />
          <label htmlFor="inStock" className="text-xs sm:text-sm text-text-primary cursor-pointer select-none">
            Available in Stock
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-4 rounded-lg text-background font-medium transition-all text-sm sm:text-base ${
            editingProduct 
              ? 'bg-accent-orange hover:bg-orange-600' 
              : 'bg-primary hover:bg-secondary'
          } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            'Processing...'
          ) : editingProduct ? (
            <>
              <Save size={18} /> Update Product
            </>
          ) : (
            <>
              <Plus size={18} /> Add Product
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
