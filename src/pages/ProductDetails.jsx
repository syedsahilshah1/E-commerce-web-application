import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products } from '../data/mockData';
import RatingComponent from '../components/RatingComponent';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import { 
  RiHeartLine, 
  RiHeartFill, 
  RiShoppingBag3Line, 
  RiCheckLine,
  RiAddLine,
  RiSubtractLine,
  RiShieldCheckLine,
  RiExchangeLine,
  RiArrowRightLine
} from 'react-icons/ri';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, triggerToast } = useApp();

  // Find current product
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/shop" className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Gallery, options and review states
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // Custom reviews state
  const [customReviews, setCustomReviews] = useState(product.reviews || []);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  useEffect(() => {
    // Reset states when product changes
    setActiveImgIdx(0);
    setSelectedColor(product.colors[0] || '');
    setSelectedSize(product.sizes[0] || '');
    setQuantity(1);
    setCustomReviews(product.reviews || []);
    setNewReview({ name: '', rating: 5, comment: '' });
  }, [id, product]);

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const discountPrice = product.discountPrice;
  const isDiscounted = discountPrice && discountPrice < product.price;
  const activePrice = discountPrice || product.price;

  // Quantity controls
  const handleQuantityIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      triggerToast(`Only ${product.stock} items currently in stock.`, 'warning');
    }
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    navigate('/cart');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      triggerToast('Please fill out all fields before submitting.', 'warning');
      return;
    }

    const reviewObj = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment
    };

    setCustomReviews([reviewObj, ...customReviews]);
    triggerToast('Review submitted successfully!', 'success');
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  // Related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Page Breadcrumb */}
      <Breadcrumb
        items={[
          { name: 'Shop', path: '/shop' },
          { name: product.name }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-2">
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-900 rounded-3xl border border-slate-200/50 dark:border-slate-800/80">
            <img
              src={product.images[activeImgIdx]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 bg-slate-100 dark:bg-slate-900 cursor-pointer ${
                    idx === activeImgIdx 
                      ? 'border-primary-600 dark:border-primary-500 shadow-md' 
                      : 'border-transparent hover:border-slate-300 dark:hover:border-slate-800'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Actions & Selector (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Brand & Stock Status */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs tracking-wider uppercase font-black text-primary-600 dark:text-primary-400">
              {product.brand}
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            {product.stock > 0 ? (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-500">
                <RiCheckLine className="w-4 h-4" /> In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-xs font-bold text-rose-500">Out of Stock</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <RatingComponent rating={product.rating} size={15} />
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              {product.rating} stars ({customReviews.length} customer reviews)
            </span>
          </div>

          {/* Price details */}
          <div className="flex items-baseline gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl w-full">
            {isDiscounted ? (
              <>
                <span className="text-2xl md:text-3xl font-black text-slate-950 dark:text-white">
                  ${discountPrice.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-slate-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/20 px-2.5 py-1 rounded-full">
                  Save {product.discountPercentage}%
                </span>
              </>
            ) : (
              <span className="text-2xl md:text-3xl font-black text-slate-950 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Option Selector Fields */}
          <div className="flex flex-col gap-5 w-full mb-8">
            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Color</span>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-all ${
                        selectedColor === color 
                          ? 'border-slate-900 dark:border-white scale-110 shadow-md' 
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'Standard' && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Size</span>
                <div className="flex items-center gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Quantity</span>
                <div className="flex items-center gap-1.5 w-[120px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1">
                  <button
                    onClick={handleQuantityDecrease}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                  >
                    <RiSubtractLine className="w-4 h-4" />
                  </button>
                  <span className="flex-grow text-center text-sm font-bold text-slate-800 dark:text-slate-200">
                    {quantity}
                  </span>
                  <button
                    onClick={handleQuantityIncrease}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                  >
                    <RiAddLine className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {product.stock > 0 ? (
            <div className="flex flex-col sm:flex-row gap-4 w-full mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-grow flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-bold hover:bg-primary-600 dark:hover:bg-primary-600 transition-all shadow-md cursor-pointer"
              >
                <RiShoppingBag3Line className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-grow flex items-center justify-center px-8 py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-md cursor-pointer"
              >
                Buy Now
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-650 hover:text-rose-500 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
                aria-label="Add to Wishlist"
              >
                {isWishlisted ? (
                  <RiHeartFill className="w-5 h-5 text-rose-500 animate-pulse" />
                ) : (
                  <RiHeartLine className="w-5 h-5" />
                )}
              </button>
            </div>
          ) : (
            <div className="w-full p-4 border border-rose-100 dark:border-rose-950/20 bg-rose-50/50 dark:bg-rose-950/5 rounded-2xl mb-8">
              <p className="text-sm font-bold text-rose-600 dark:text-rose-455 text-center">
                This item is currently sold out. Check back later or explore related options below.
              </p>
            </div>
          )}

          {/* Small Trust Guarantees */}
          <div className="grid grid-cols-2 gap-4 w-full border-t border-slate-200/50 dark:border-slate-800/80 pt-6">
            <div className="flex items-center gap-3 text-left">
              <RiShieldCheckLine className="w-5 h-5 text-primary-600" />
              <span className="text-xs text-slate-500 font-semibold dark:text-slate-400">
                1-Year standard warranty
              </span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <RiExchangeLine className="w-5 h-5 text-primary-600" />
              <span className="text-xs text-slate-500 font-semibold dark:text-slate-400">
                30-day money-back guarantee
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Specs, Reviews */}
      <div className="flex flex-col gap-6 border-t border-slate-200/50 dark:border-slate-800/80 pt-10 mt-6">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === tab
                  ? 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-550'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'reviews' ? `Reviews (${customReviews.length})` : tab}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div className="text-left py-2 min-h-[160px]">
          {activeTab === 'description' && (
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
              {product.description}
            </p>
          )}

          {activeTab === 'specifications' && (
            <div className="max-w-2xl border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <tr 
                      key={key} 
                      className={idx % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-900/30' : 'bg-transparent'}
                    >
                      <td className="px-4 py-3 font-bold text-slate-500 dark:text-slate-450 border-r border-slate-200/50 dark:border-slate-850 w-1/3">
                        {key}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-205">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Reviews List (7 cols) */}
              <div className="md:col-span-7 flex flex-col gap-6">
                {customReviews.length > 0 ? (
                  customReviews.map((rev) => (
                    <div 
                      key={rev.id} 
                      className="p-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-4 mb-2.5">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          {rev.name}
                        </h4>
                        <span className="text-xs text-slate-400">{rev.date}</span>
                      </div>
                      <div className="mb-3">
                        <RatingComponent rating={rev.rating} size={12} />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed leading-normal">
                        {rev.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-450 italic text-sm">No reviews yet. Be the first to review this product!</p>
                )}
              </div>

              {/* Add Review Form (5 cols) */}
              <div className="md:col-span-5">
                <form 
                  onSubmit={handleReviewSubmit}
                  className="p-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl flex flex-col gap-4 text-left"
                >
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">Write a Review</h3>
                  
                  {/* Name field */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Your Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  {/* Rating Selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Rating</label>
                    <RatingComponent
                      rating={newReview.rating}
                      interactive={true}
                      size={18}
                      onChange={(val) => setNewReview({ ...newReview, rating: val })}
                    />
                  </div>

                  {/* Comment field */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-455">Review Description</label>
                    <textarea
                      placeholder="Share your thoughts about this product..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-primary-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-primary-650 transition-colors shadow-md mt-2 cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="flex flex-col gap-6 border-t border-slate-200/50 dark:border-slate-800/80 pt-10 mt-8">
          <div className="flex items-end justify-between">
            <div className="text-left">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Related Products</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Recommended items from the same category</p>
            </div>
            <Link 
              to={`/shop?category=${product.category}`} 
              className="text-sm font-bold text-primary-600 dark:text-primary-400 flex items-center gap-1 hover:underline"
            >
              View Category <RiArrowRightLine />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
