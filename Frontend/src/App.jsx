import React, { useState, useEffect } from 'react';
import api from './api/axios';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { ShoppingBag, AlertCircle, RefreshCw } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/products');
      setProducts(response.data.data || response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError('Failed to load products. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Create or Update Product
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        // Update
        await api.put(`/products/${editingProduct._id}`, formData);
        setEditingProduct(null);
      } else {
        // Create
        await api.post('/products', formData);
      }
      await fetchProducts(); // Refresh list
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        await fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product.");
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    // Scroll to top on mobile to see form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-text-primary pb-12">
      {/* Header */}
      <header className="bg-surface border-b border-border-dark sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="bg-primary p-1.5 sm:p-2 rounded-lg">
              <ShoppingBag className="text-background" size={18} />
            </div>
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-text-primary tracking-tight">Product Manager</h1>
          </div>
          <div className="text-xs sm:text-sm text-text-secondary hidden sm:block">
            Admin Dashboard
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {error ? (
          <div className="bg-surface border border-border-error rounded-xl p-4 sm:p-6 text-center max-w-lg mx-auto mt-6 sm:mt-10">
            <AlertCircle className="mx-auto text-border-error mb-3" size={40} />
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">Connection Error</h3>
            <p className="text-sm sm:text-base text-text-secondary mb-4 sm:mb-6">{error}</p>
            <button 
              onClick={fetchProducts}
              className="px-4 sm:px-6 py-2 bg-border-error text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto text-sm sm:text-base"
            >
              <RefreshCw size={16} /> Retry Connection
            </button>
            <p className="mt-3 sm:mt-4 text-xs text-text-secondary">
              Note: Make sure the local server is running on port 5001.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-1 lg:sticky lg:top-20">
              <ProductForm 
                onSubmit={handleFormSubmit} 
                editingProduct={editingProduct}
                onCancelEdit={handleCancelEdit}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Right Column: List */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="bg-surface rounded-xl border border-border-dark p-8 sm:p-12 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]">
                  <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary mb-4"></div>
                  <p className="text-text-secondary font-medium text-sm sm:text-base">Loading products...</p>
                </div>
              ) : (
                <ProductList 
                  products={products} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
