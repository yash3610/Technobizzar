import React, { useState, useMemo } from 'react';
import { Edit2, Trash2, Search, Filter, ArrowUpDown, PackageX, PackageCheck } from 'lucide-react';

const ProductList = ({ products, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('none'); // none, asc, desc

  // Extract unique categories for filter dropdown
  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Search
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter
    if (filterCategory !== 'All') {
      result = result.filter(p => p.category === filterCategory);
    }

    // 3. Sort
    if (sortOrder !== 'none') {
      result.sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }

    return result;
  }, [products, searchTerm, filterCategory, sortOrder]);

  const toggleSort = () => {
    setSortOrder(prev => {
      if (prev === 'none') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'none';
    });
  };

  return (
    <div className="bg-surface rounded-xl border border-border-dark overflow-hidden flex flex-col h-full">
      {/* Toolbar */}
      <div className="p-3 sm:p-4 md:p-5 border-b border-border-dark space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-3 sm:gap-4 bg-background/50">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm bg-background border border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-primary placeholder-text-secondary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:flex-none min-w-[140px]">
            <Filter className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-7 sm:pl-9 pr-6 sm:pr-8 py-1.5 sm:py-2 border border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-xs sm:text-sm bg-background text-text-primary appearance-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button
            onClick={toggleSort}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${
              sortOrder !== 'none' 
                ? 'bg-primary/20 border-primary text-primary' 
                : 'border-border-dark text-text-primary hover:bg-surface'
            }`}
          >
            <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">
              {sortOrder === 'asc' ? 'Price: Low to High' : sortOrder === 'desc' ? 'Price: High to Low' : 'Sort Price'}
            </span>
            <span className="sm:hidden">
              {sortOrder === 'asc' ? 'Low-High' : sortOrder === 'desc' ? 'High-Low' : 'Sort'}
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-background/50 text-text-secondary text-[10px] sm:text-xs uppercase tracking-wider">
              <th className="p-2 sm:p-3 md:p-4 font-semibold border-b border-border-dark">Product Name</th>
              <th className="p-2 sm:p-3 md:p-4 font-semibold border-b border-border-dark">Category</th>
              <th className="p-2 sm:p-3 md:p-4 font-semibold border-b border-border-dark">Price</th>
              <th className="p-2 sm:p-3 md:p-4 font-semibold border-b border-border-dark text-center">Status</th>
              <th className="p-2 sm:p-3 md:p-4 font-semibold border-b border-border-dark text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dark">
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((product) => (
                <tr key={product._id} className="hover:bg-background/50 transition-colors group">
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-medium text-text-primary">{product.name}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-text-secondary">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-medium text-text-primary">£{Number(product.price).toFixed(2)}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-center">
                    {product.inStock ? (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-accent-green bg-accent-green/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-accent-green/30">
                        <PackageCheck size={12} className="sm:w-3.5 sm:h-3.5" /> <span className="hidden sm:inline">In Stock</span><span className="sm:hidden">In</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-border-error bg-border-error/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-border-error/30">
                        <PackageX size={12} className="sm:w-3.5 sm:h-3.5" /> <span className="hidden sm:inline">Out of Stock</span><span className="sm:hidden">Out</span>
                      </span>
                    )}
                  </td>
                  <td className="p-2 sm:p-3 md:p-4 text-right">
                    <div className="flex items-center justify-end gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-1 sm:p-1.5 text-text-secondary hover:text-primary hover:bg-primary/20 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={14} className="sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(product._id)}
                        className="p-1 sm:p-1.5 text-text-secondary hover:text-border-error hover:bg-border-error/20 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 sm:p-8 text-center text-text-secondary text-xs sm:text-sm">
                  No products found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-3 sm:p-4 border-t border-border-dark bg-background/50 text-[10px] sm:text-xs text-text-secondary flex justify-between">
        <span>Showing {filteredAndSortedProducts.length} items</span>
      </div>
    </div>
  );
};

export default ProductList;
