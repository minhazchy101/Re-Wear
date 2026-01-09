import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import ClothesCard from '../reuseable/ClothesCard';
import LoadingSpinner from '../reuseable/LoadingSpinner';


const AllProducts = () => {
  const { clothes } = useAppContext();

  const [allClothes, setAllClothes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('all');
  const [loading, setLoading] = useState(true);

 
  const handleSearch = () => {
    setSearchTerm(searchQuery);
  };

  useEffect(() => {
    setLoading(true);

    let filtered = [...clothes];
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.size?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortOption) {
      case 'free':
        filtered = filtered.filter((item) => item.isFree);
        break;
      case 'lowToHigh':
        filtered = filtered
          .filter((item) => !item.isFree)
          .sort((a, b) => a.price - b.price);
        break;
      case 'highToLow':
        filtered = filtered
          .filter((item) => !item.isFree)
          .sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setAllClothes(filtered);
    setLoading(false);
  }, [clothes, searchTerm, sortOption]);

  return (
    <section className="section py-16">
      {/* Header */}
      <div className="text-center mb-10">
         <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold md:font-bold">All Clothes </h1>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
          Discover premium clothing crafted for comfort and style.
        </p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        {/* Search */}
        <div className="flex w-full sm:w-96">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search T-shirt, size M, Dhaka..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              className="w-full py-3 pl-10 pr-4 rounded-l-full border-light-bg shadow-sm focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            className="btn-primary  py-2 px-5 rounded-r-full"
          >
            Search
          </button>
        </div>

        {/* Sort */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="py-3 px-4 btn-secondary rounded-full"
        >
          <option value="all">All Products</option>
          <option value="free">Free</option>
          <option value="lowToHigh">Price: Low → High</option>
          <option value="highToLow">Price: High → Low</option>
        </select>
      </div>

      {/* Products / Loading */}
      {loading ? (
        <div className="mt-32 flex justify-center">
          <LoadingSpinner size="w-12 h-12" />
        </div>
      ) : allClothes.length ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allClothes.map((item, i) => (
            <ClothesCard key={i} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-20">
          No products found
        </p>
      )}
    </section>
  );
};

export default AllProducts;
