import React, { createContext, useContext, useState, useEffect } from 'react';
import { coupons, products } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Auth / User state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Coupons state
  const [activeCoupon, setActiveCoupon] = useState(null);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Toast trigger function
  const triggerToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Sync theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Sync cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync user
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Sync orders
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Cart operations
  const addToCart = (product, color, size, quantity = 1) => {
    const selectedColor = color || (product.colors && product.colors[0]) || 'Standard';
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    const cartItemId = `${product.id}-${selectedColor}-${selectedSize}`;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        const newQuantity = updatedCart[existingItemIndex].quantity + quantity;
        
        if (newQuantity > product.stock) {
          triggerToast(`Cannot add more. Only ${product.stock} items in stock.`, 'warning');
          return prevCart;
        }

        updatedCart[existingItemIndex].quantity = newQuantity;
        triggerToast(`Updated ${product.name} quantity in your cart!`, 'success');
        return updatedCart;
      } else {
        if (quantity > product.stock) {
          triggerToast(`Only ${product.stock} items in stock.`, 'warning');
          return prevCart;
        }
        triggerToast(`${product.name} added to your cart!`, 'success');
        return [...prevCart, {
          cartItemId,
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          discountPrice: product.discountPrice,
          image: product.images[0],
          color: selectedColor,
          size: selectedSize,
          quantity,
          stock: product.stock
        }];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.cartItemId === cartItemId);
      if (item) {
        triggerToast(`${item.name} removed from your cart.`, 'info');
      }
      return prevCart.filter((i) => i.cartItemId !== cartItemId);
    });
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.cartItemId === cartItemId) {
          if (newQuantity > item.stock) {
            triggerToast(`Sorry, only ${item.stock} units available in stock.`, 'warning');
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const applyCoupon = (code) => {
    const coupon = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) {
      triggerToast('Invalid coupon code.', 'error');
      return false;
    }
    
    const subtotal = getCartSubtotal();
    if (subtotal < coupon.minSpend) {
      triggerToast(`Coupon requires a minimum purchase of $${coupon.minSpend}.`, 'warning');
      return false;
    }

    setActiveCoupon(coupon);
    triggerToast(`Coupon "${coupon.code}" applied!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    triggerToast('Coupon removed.', 'info');
  };

  // Cart helper calculations
  const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);
  
  const getCartSubtotal = () => cart.reduce((total, item) => {
    const activePrice = item.discountPrice || item.price;
    return total + activePrice * item.quantity;
  }, 0);

  const getCartDiscount = () => {
    if (!activeCoupon) return 0;
    const subtotal = getCartSubtotal();
    if (activeCoupon.discountType === 'percentage') {
      return (subtotal * activeCoupon.value) / 100;
    } else if (activeCoupon.discountType === 'fixed') {
      return activeCoupon.value;
    }
    return 0;
  };

  const getShippingCost = () => {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    return subtotal > 150 ? 0 : 15.00; // Free shipping over $150
  };

  const getTaxAmount = () => {
    const subtotal = getCartSubtotal();
    const discount = getCartDiscount();
    return Math.max(0, (subtotal - discount) * 0.08); // 8% sales tax
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const discount = getCartDiscount();
    const shipping = getShippingCost();
    const tax = getTaxAmount();
    return Math.max(0, subtotal - discount + shipping + tax);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyIn = prevWishlist.some((item) => item.id === product.id);
      if (isAlreadyIn) {
        triggerToast(`${product.name} removed from your wishlist.`, 'info');
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        triggerToast(`${product.name} added to your wishlist!`, 'success');
        return [...prevWishlist, {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          discountPrice: product.discountPrice,
          image: product.images[0],
          rating: product.rating,
          stock: product.stock
        }];
      }
    });
  };

  // Mock Authentication operations
  const login = (email, password) => {
    // Basic mock user
    if (email && password) {
      const mockUser = {
        name: 'Jane Doe',
        email: email,
        phone: '+1 (555) 019-2834',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        joinedDate: 'August 2026',
        addresses: [
          {
            id: 'addr_1',
            street: '128 Pine Street, Suite 400',
            city: 'San Francisco',
            state: 'CA',
            zip: '94103',
            country: 'United States',
            isDefault: true
          }
        ]
      };
      setUser(mockUser);
      triggerToast('Logged in successfully!', 'success');
      return true;
    }
    return false;
  };

  const register = (fullName, email, phone, password) => {
    if (fullName && email && password) {
      const mockUser = {
        name: fullName,
        email: email,
        phone: phone || '+1 (555) 000-0000',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
        joinedDate: 'August 2026',
        addresses: []
      };
      setUser(mockUser);
      triggerToast('Account registered successfully!', 'success');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    setActiveCoupon(null);
    triggerToast('Logged out successfully.', 'info');
  };

  const updateProfile = (updatedData) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      triggerToast('Profile updated!', 'success');
      return { ...prevUser, ...updatedData };
    });
  };

  // Checkout / Create Order
  const createOrder = (shippingDetails, paymentMethod) => {
    const newOrder = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: [...cart],
      totals: {
        subtotal: getCartSubtotal(),
        discount: getCartDiscount(),
        shipping: getShippingCost(),
        tax: getTaxAmount(),
        total: getCartTotal()
      },
      shippingDetails,
      paymentMethod,
      status: 'Processing'
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCart([]);
    setActiveCoupon(null);
    triggerToast('Order placed successfully!', 'success');
    return newOrder.orderId;
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        wishlist,
        toggleWishlist,
        user,
        login,
        register,
        logout,
        updateProfile,
        orders,
        createOrder,
        toasts,
        triggerToast,
        activeCoupon,
        applyCoupon,
        removeCoupon,
        getCartCount,
        getCartSubtotal,
        getCartDiscount,
        getShippingCost,
        getTaxAmount,
        getCartTotal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
